import { ApiResponse, asyncHandler } from '../../shared/utils/api';
import { AuthValidator } from '../validators/auth';
import { AuthService } from '../services/auth';
import { jwtExpiresToDate } from '../../shared/utils/helpers';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_PATH,
} from '../../shared/constants';

export class AuthController {
  constructor(
    private readonly validator: AuthValidator,
    private readonly service: AuthService
  ) {}

  signUp = asyncHandler(async (req, res) => {
    const validatedData = this.validator.signUp({
      ...req.body,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });
    const result = await this.service.signUp(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'User registered successfully' });
  });

  verifyEmail = asyncHandler(async (req, res) => {
    const validatedData = this.validator.verifyEmail(req.body);
    const result = await this.service.verifyEmail(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'Email verified successfully' });
  });

  resendVerificationEmail = asyncHandler(async (req, res) => {
    const validatedData = this.validator.resendVerificationEmail(req.body);
    const result = await this.service.resendVerificationEmail(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'Verification email resent successfully' });
  });

  signIn = asyncHandler(async (req, res) => {
    const validatedData = this.validator.signIn({
      ...req.body,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });
    const result = await this.service.signIn(validatedData);
    ApiResponse.setCookie(res, {
      name: ACCESS_TOKEN_COOKIE_NAME,
      value: result.accessToken,
      options: {
        expires: jwtExpiresToDate(ACCESS_TOKEN_EXPIRES_IN),
      },
    });
    ApiResponse.setCookie(res, {
      name: REFRESH_TOKEN_COOKIE_NAME,
      value: result.refreshToken,
      options: {
        expires: jwtExpiresToDate(REFRESH_TOKEN_EXPIRES_IN),
        path: REFRESH_TOKEN_PATH,
      },
    });
    ApiResponse.sendSuccess(res, { data: result, message: 'Signed in successfully' });
  });

  signOut = asyncHandler(async (req, res) => {
    const validatedData = this.validator.signOut({ sessionId: req.session?.id, userId: req.user?.id });
    const result = await this.service.signOut(validatedData);
    ApiResponse.clearCookie(res, { name: ACCESS_TOKEN_COOKIE_NAME });
    ApiResponse.clearCookie(res, { name: REFRESH_TOKEN_COOKIE_NAME, options: { path: REFRESH_TOKEN_PATH } });
    ApiResponse.sendSuccess(res, { data: result, message: 'Signed out successfully' });
  });

  refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME] || req.body[REFRESH_TOKEN_COOKIE_NAME] || '';
    const validatedData = this.validator.refreshToken({ refreshToken });
    const result = await this.service.refreshToken(validatedData);
    ApiResponse.clearCookie(res, { name: ACCESS_TOKEN_COOKIE_NAME });
    ApiResponse.setCookie(res, {
      name: ACCESS_TOKEN_COOKIE_NAME,
      value: result.accessToken,
      options: {
        expires: jwtExpiresToDate(ACCESS_TOKEN_EXPIRES_IN),
      },
    });
    ApiResponse.sendSuccess(res, { data: result, message: 'Token refreshed successfully' });
  });

  forgotPassword = asyncHandler(async (req, res) => {
    const validatedData = this.validator.forgotPassword(req.body);
    const result = await this.service.forgotPassword(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'Password reset email sent' });
  });

  resetPassword = asyncHandler(async (req, res) => {
    const validatedData = this.validator.resetPassword(req.body);
    const result = await this.service.resetPassword(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'Password reset successfully' });
  });

  getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    ApiResponse.sendSuccess(res, { data: user, message: 'User fetched successfully' });
  });
}
