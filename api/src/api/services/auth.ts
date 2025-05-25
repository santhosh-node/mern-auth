import { VerificationCodeType } from '../../resources/database/_types';
import { SessionRepository } from '../../resources/database/repositories/session';
import { UserRepository } from '../../resources/database/repositories/user';
import { VerificationCodeRepository } from '../../resources/database/repositories/verification-code';
import { sendEmailVerification, sendPasswordResetEmail } from '../../resources/mailers/samples';
import { REFRESH_TOKEN_EXPIRES_IN } from '../../shared/constants';
import { ApiError } from '../../shared/utils/api';
import { Encrypt, JWTToken } from '../../shared/utils/base';
import { fifteenMinutesFromNow, fiveMinutesAgo, jwtExpiresToDate } from '../../shared/utils/helpers';
import type {
  SignUpRequestDTO,
  SignInRequestDTO,
  VerifyEmailRequestDTO,
  ResendVerificationEmailRequestDTO,
  ForgotPasswordRequestDTO,
  ResetPasswordRequestDTO,
  RefreshTokenRequestDTO,
  SignOutRequestDTO,
} from '../_types/auth';

const userRepo = new UserRepository();
const verificationCodeRepo = new VerificationCodeRepository();
const sessionRepo = new SessionRepository();

export class AuthService {
  // ------------------------ Sign Up ------------------------
  async signUp(data: SignUpRequestDTO) {
    const existingUser = await userRepo.findByEmail(data.email);
    if (existingUser) {
      throw ApiError.SignupEmailAlreadyExists('Email is already registered. Please sign in instead.');
    }

    const newUser = await userRepo.create(data);
    const userObj = userRepo.toObject(newUser);

    const verificationCode = await verificationCodeRepo.create({
      userId: userObj.id,
      type: VerificationCodeType.EmailVerification,
      code: Encrypt.generateRandomDigit(),
      expiresAt: fifteenMinutesFromNow(),
    });

    const { success } = await sendEmailVerification(userObj.email, verificationCode.code);

    if (!success) {
      await userRepo.deleteById(userObj.id);
      throw ApiError.SendVerifyEmailFailed('Failed to send verification email. Please try again later.');
    }

    return { user: userObj };
  }

  // ------------------------ Sign In ------------------------
  async signIn(data: SignInRequestDTO) {
    const user = await userRepo.findByEmail(data.email);
    if (!user || !(await userRepo.validatePassword(data.password, user))) {
      throw ApiError.SigninInvalidCredentials('Invalid email or password.');
    }

    const userObj = userRepo.toObject(user);
    if (!userObj.isEmailVerified) {
      throw ApiError.SigninEmailNotVerified('Please verify your email before signing in.');
    }

    const session = await sessionRepo.create({
      userId: userObj.id,
      userAgent: data.userAgent,
      ipAddress: data.ipAddress,
      expiresAt: jwtExpiresToDate(REFRESH_TOKEN_EXPIRES_IN),
    });

    const sessionObj = session.toObject();

    const accessToken = JWTToken.signAccessToken({ userId: userObj.id, sessionId: sessionObj.id });
    const refreshToken = JWTToken.signRefreshToken({ userId: userObj.id, sessionId: sessionObj.id });

    return { user: userObj, accessToken, refreshToken };
  }

  // ------------------------ Sign Out ------------------------
  async signOut(data: SignOutRequestDTO) {
    if (data.sessionId) {
      await sessionRepo.deleteById(data.sessionId);
    }
  }

  // ------------------------ Forgot Password ------------------------
  async forgotPassword(data: ForgotPasswordRequestDTO) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw ApiError.ForgotPasswordEmailNotFound('If this email exists, a reset link will be sent.');
    }

    const userObj = userRepo.toObject(user);
    if (!userObj.isEmailVerified) {
      throw ApiError.SigninEmailNotVerified('Please verify your email before resetting your password.');
    }

    const recentRequests = await verificationCodeRepo.count({
      userId: userObj.id,
      type: VerificationCodeType.PasswordReset,
      createdAt: { $gt: fiveMinutesAgo() },
    });

    if (recentRequests >= 1) {
      throw ApiError.ForgotPasswordTooManyRequests('Too many requests. Please try again shortly.');
    }

    await verificationCodeRepo.deleteManyByUserId(userObj.id);

    const verificationCode = await verificationCodeRepo.create({
      userId: userObj.id,
      type: VerificationCodeType.PasswordReset,
      code: Encrypt.generateRandomDigit(),
      expiresAt: fifteenMinutesFromNow(),
    });

    const { success } = await sendPasswordResetEmail(userObj.email, verificationCode.code);
    if (!success) {
      throw ApiError.ForgotPasswordServiceUnavailable('Failed to send password reset email. Please try again later.');
    }

    return { success: true };
  }

  // ------------------------ Reset Password ------------------------
  async resetPassword(data: ResetPasswordRequestDTO) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw ApiError.ResetPasswordUserNotFound('User not found.');
    }

    const userObj = userRepo.toObject(user);
    if (!userObj.isEmailVerified) {
      throw ApiError.SigninEmailNotVerified('Please verify your email before resetting your password.');
    }

    const validCode = await verificationCodeRepo.findOne({
      userId: userObj.id,
      type: VerificationCodeType.PasswordReset,
      code: data.code,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw ApiError.ResetPasswordTokenInvalid('Invalid or expired verification code.');
    }

    const updatedUser = await userRepo.updatePassword(userObj.id, data.newPassword);
    if (!updatedUser) {
      throw ApiError.InternalServerError('Unable to reset password. Please try again.');
    }

    await verificationCodeRepo.deleteById(validCode.id);
    await sessionRepo.deleteManyByUserId(userObj.id);

    return { user: userRepo.toObject(updatedUser) };
  }

  // ------------------------ Verify Email ------------------------
  async verifyEmail(data: VerifyEmailRequestDTO) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw ApiError.VerifyEmailUserNotFound('User not found.');
    }

    const userObj = userRepo.toObject(user);

    const codeRecord = await verificationCodeRepo.findOne({
      userId: userObj.id,
      type: VerificationCodeType.EmailVerification,
      code: data.code,
      expiresAt: { $gt: new Date() },
    });

    if (!codeRecord) {
      throw ApiError.VerifyEmailTokenInvalid('Invalid or expired verification code.');
    }

    if (userObj.isEmailVerified) {
      return {
        message: 'Email already verified.',
        user: userObj,
      };
    }

    const updatedUser = await userRepo.updateById(userObj.id, { isEmailVerified: true });
    if (!updatedUser) {
      throw ApiError.InternalServerError('Failed to verify email.');
    }

    await verificationCodeRepo.deleteById(codeRecord.id);

    return {
      message: 'Email verified successfully.',
      user: userRepo.toObject(updatedUser),
    };
  }

  // ------------------------ Resend Verification Email ------------------------
  async resendVerificationEmail(data: ResendVerificationEmailRequestDTO) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw ApiError.SendVerifyEmailUserNotFound('User not found.');
    }

    const userObj = userRepo.toObject(user);
    if (userObj.isEmailVerified) {
      throw ApiError.VerifyEmailAlreadyVerified('Email is already verified.');
    }

    const recentRequests = await verificationCodeRepo.count({
      userId: userObj.id,
      type: VerificationCodeType.EmailVerification,
      createdAt: { $gt: fiveMinutesAgo() },
    });

    if (recentRequests >= 1) {
      throw ApiError.SendVerifyEmailTooManyRequests('Too many requests. Please try again later.');
    }

    await verificationCodeRepo.deleteManyByUserId(userObj.id);

    const verificationCode = await verificationCodeRepo.create({
      userId: userObj.id,
      type: VerificationCodeType.EmailVerification,
      code: Encrypt.generateRandomDigit(),
      expiresAt: fifteenMinutesFromNow(),
    });

    const { success } = await sendEmailVerification(userObj.email, verificationCode.code);
    if (!success) {
      throw ApiError.SendVerifyEmailFailed('Failed to send verification email.');
    }

    return {
      message: 'Verification email sent successfully.',
    };
  }

  // ------------------------ Refresh Token ------------------------
  async refreshToken(data: RefreshTokenRequestDTO) {
    const payload = JWTToken.verifyRefreshToken(data.refreshToken);
    if (!payload || !payload.sessionId || !payload.userId) {
      throw ApiError.Unauthorized('Invalid refresh token');
    }

    const session = await sessionRepo.findById(payload.sessionId);
    if (!session || session.expiresAt.getTime() < Date.now()) {
      throw ApiError.Unauthorized('Invalid session');
    }

    const sessionObj = sessionRepo.toObject(session);

    const accessToken = JWTToken.signAccessToken({
      userId: sessionObj.userId,
      sessionId: sessionObj.id,
    });

    return { accessToken };
  }
}
