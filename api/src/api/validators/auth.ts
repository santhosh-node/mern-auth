import {
  SignUpRequestSchema,
  SignInRequestSchema,
  VerifyEmailRequestSchema,
  ResendVerificationEmailRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
  RefreshTokenRequestSchema,
  SignOutRequestSchema,
} from '../_types/auth';

export class AuthValidator {
  signUp(data: unknown) {
    return SignUpRequestSchema.parse(data);
  }

  verifyEmail(data: unknown) {
    return VerifyEmailRequestSchema.parse(data);
  }

  resendVerificationEmail(data: unknown) {
    return ResendVerificationEmailRequestSchema.parse(data);
  }

  signIn(data: unknown) {
    return SignInRequestSchema.parse(data);
  }

  signOut(data: unknown) {
    return SignOutRequestSchema.parse(data);
  }

  refreshToken(data: unknown) {
    return RefreshTokenRequestSchema.parse(data);
  }

  forgotPassword(data: unknown) {
    return ForgotPasswordRequestSchema.parse(data);
  }

  resetPassword(data: unknown) {
    return ResetPasswordRequestSchema.parse(data);
  }
}
