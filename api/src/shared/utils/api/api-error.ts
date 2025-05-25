import { ApiErrorCode, HttpStatusCode } from '../../constants';

export class ApiError extends Error {
  statusCode: HttpStatusCode;
  errorCode: ApiErrorCode;
  details?: any;

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    errorCode: ApiErrorCode = ApiErrorCode.UNKNOWN_ERROR,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  // ─── GENERAL ERRORS ───
  static UnknownError(message = 'Unknown Error', details?: any) {
    return new ApiError(message, HttpStatusCode.INTERNAL_SERVER_ERROR, ApiErrorCode.UNKNOWN_ERROR, details);
  }

  static InvalidRequest(message = 'Invalid Request', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.INVALID_REQUEST, details);
  }

  static InternalServerError(message = 'Server Error', details?: any) {
    return new ApiError(message, HttpStatusCode.INTERNAL_SERVER_ERROR, ApiErrorCode.SERVER_ERROR, details);
  }

  static Unauthorized(message = 'Unauthorized', details?: any) {
    return new ApiError(message, HttpStatusCode.UNAUTHORIZED, ApiErrorCode.UNAUTHORIZED, details);
  }

  static Forbidden(message = 'Forbidden', details?: any) {
    return new ApiError(message, HttpStatusCode.FORBIDDEN, ApiErrorCode.FORBIDDEN, details);
  }

  static NotFound(message = 'Not Found', details?: any) {
    return new ApiError(message, HttpStatusCode.NOT_FOUND, ApiErrorCode.NOT_FOUND, details);
  }

  static Timeout(message = 'Timeout', details?: any) {
    return new ApiError(message, HttpStatusCode.REQUEST_TIMEOUT, ApiErrorCode.TIMEOUT, details);
  }

  static RateLimitExceeded(message = 'Rate Limit Exceeded', details?: any) {
    return new ApiError(message, HttpStatusCode.TOO_MANY_REQUESTS, ApiErrorCode.RATE_LIMIT_EXCEEDED, details);
  }

  static DependencyFailure(message = 'Dependency Failure', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_GATEWAY, ApiErrorCode.DEPENDENCY_FAILURE, details);
  }

  // ─── SIGNUP ERRORS ───
  static SignupEmailAlreadyExists(message = 'Email Already Exists', details?: any) {
    return new ApiError(message, HttpStatusCode.CONFLICT, ApiErrorCode.SIGNUP_EMAIL_ALREADY_EXISTS, details);
  }

  static SignupUsernameTaken(message = 'Username Taken', details?: any) {
    return new ApiError(message, HttpStatusCode.CONFLICT, ApiErrorCode.SIGNUP_USERNAME_TAKEN, details);
  }

  static SignupWeakPassword(message = 'Weak Password', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.SIGNUP_WEAK_PASSWORD, details);
  }

  static SignupInvalidEmail(message = 'Invalid Email', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.SIGNUP_INVALID_EMAIL, details);
  }

  static SignupTermsNotAccepted(message = 'Terms Not Accepted', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.SIGNUP_TERMS_NOT_ACCEPTED, details);
  }

  static SignupCaptchaFailed(message = 'Captcha Failed', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.SIGNUP_CAPTCHA_FAILED, details);
  }

  // ─── SIGNIN ERRORS ───
  static SigninEmailNotVerified(message = 'Email Not Verified', details?: any) {
    return new ApiError(message, HttpStatusCode.FORBIDDEN, ApiErrorCode.SIGNIN_EMAIL_NOT_VERIFIED, details);
  }

  static SigninInvalidCredentials(message = 'Invalid Credentials', details?: any) {
    return new ApiError(message, HttpStatusCode.UNAUTHORIZED, ApiErrorCode.SIGNIN_INVALID_CREDENTIALS, details);
  }

  static SigninAccountLocked(message = 'Account Locked', details?: any) {
    return new ApiError(message, HttpStatusCode.FORBIDDEN, ApiErrorCode.SIGNIN_ACCOUNT_LOCKED, details);
  }

  static SigninAccountNotVerified(message = 'Account Not Verified', details?: any) {
    return new ApiError(message, HttpStatusCode.FORBIDDEN, ApiErrorCode.SIGNIN_ACCOUNT_NOT_VERIFIED, details);
  }

  static SigninTooManyAttempts(message = 'Too Many Attempts', details?: any) {
    return new ApiError(message, HttpStatusCode.TOO_MANY_REQUESTS, ApiErrorCode.SIGNIN_TOO_MANY_ATTEMPTS, details);
  }

  static SigninMfaRequired(message = 'Multi-factor Authentication Required', details?: any) {
    return new ApiError(message, HttpStatusCode.UNAUTHORIZED, ApiErrorCode.SIGNIN_MFA_REQUIRED, details);
  }

  static SigninMfaInvalid(message = 'Invalid Multi-factor Authentication', details?: any) {
    return new ApiError(message, HttpStatusCode.UNAUTHORIZED, ApiErrorCode.SIGNIN_MFA_INVALID, details);
  }

  // ─── SIGNOUT ERRORS ───
  static SignoutFailed(message = 'Signout Failed', details?: any) {
    return new ApiError(message, HttpStatusCode.INTERNAL_SERVER_ERROR, ApiErrorCode.SIGNOUT_FAILED, details);
  }

  static SignoutNotSignedIn(message = 'Not Signed In', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.SIGNOUT_NOT_SIGNED_IN, details);
  }

  // ─── FORGOT PASSWORD ERRORS ───
  static ForgotPasswordEmailNotFound(message = 'Email Not Found', details?: any) {
    return new ApiError(message, HttpStatusCode.NOT_FOUND, ApiErrorCode.FORGOT_PASSWORD_EMAIL_NOT_FOUND, details);
  }

  static ForgotPasswordTooManyRequests(message = 'Too Many Requests', details?: any) {
    return new ApiError(message, HttpStatusCode.TOO_MANY_REQUESTS, ApiErrorCode.FORGOT_PASSWORD_TOO_MANY_REQUESTS, details);
  }

  static ForgotPasswordServiceUnavailable(message = 'Service Unavailable', details?: any) {
    return new ApiError(message, HttpStatusCode.SERVICE_UNAVAILABLE, ApiErrorCode.FORGOT_PASSWORD_SERVICE_UNAVAILABLE, details);
  }

  // ─── RESET PASSWORD ERRORS ───
  static ResetPasswordTokenInvalid(message = 'Reset Password Token Invalid', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.RESET_PASSWORD_TOKEN_INVALID, details);
  }

  static ResetPasswordTokenExpired(message = 'Reset Password Token Expired', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.RESET_PASSWORD_TOKEN_EXPIRED, details);
  }

  static ResetPasswordWeakPassword(message = 'Weak Password', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.RESET_PASSWORD_WEAK_PASSWORD, details);
  }

  static ResetPasswordTooManyAttempts(message = 'Too Many Attempts', details?: any) {
    return new ApiError(message, HttpStatusCode.TOO_MANY_REQUESTS, ApiErrorCode.RESET_PASSWORD_TOO_MANY_ATTEMPTS, details);
  }

  static ResetPasswordUserNotFound(message = 'User Not Found', details?: any) {
    return new ApiError(message, HttpStatusCode.NOT_FOUND, ApiErrorCode.RESET_PASSWORD_USER_NOT_FOUND, details);
  }

  // ─── VERIFY EMAIL ERRORS ───
  static VerifyEmailTokenInvalid(message = 'Verify Email Token Invalid', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.VERIFY_EMAIL_TOKEN_INVALID, details);
  }

  static VerifyEmailTokenExpired(message = 'Verify Email Token Expired', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.VERIFY_EMAIL_TOKEN_EXPIRED, details);
  }

  static VerifyEmailAlreadyVerified(message = 'Email Already Verified', details?: any) {
    return new ApiError(message, HttpStatusCode.FORBIDDEN, ApiErrorCode.VERIFY_EMAIL_ALREADY_VERIFIED, details);
  }

  static VerifyEmailTooManyRequests(message = 'Too Many Requests', details?: any) {
    return new ApiError(message, HttpStatusCode.TOO_MANY_REQUESTS, ApiErrorCode.VERIFY_EMAIL_TOO_MANY_REQUESTS, details);
  }

  static VerifyEmailUserNotFound(message = 'User Not Found', details?: any) {
    return new ApiError(message, HttpStatusCode.NOT_FOUND, ApiErrorCode.VERIFY_EMAIL_USER_NOT_FOUND, details);
  }

  // ─── SEND VERIFY EMAIL ERRORS ───
  static SendVerifyEmailFailed(message = 'Send Verify Email Failed', details?: any) {
    return new ApiError(message, HttpStatusCode.INTERNAL_SERVER_ERROR, ApiErrorCode.SEND_VERIFY_EMAIL_FAILED, details);
  }

  static SendVerifyEmailTooManyRequests(message = 'Too Many Requests', details?: any) {
    return new ApiError(message, HttpStatusCode.TOO_MANY_REQUESTS, ApiErrorCode.SEND_VERIFY_EMAIL_TOO_MANY_REQUESTS, details);
  }

  static SendVerifyEmailUserNotFound(message = 'User Not Found', details?: any) {
    return new ApiError(message, HttpStatusCode.NOT_FOUND, ApiErrorCode.SEND_VERIFY_EMAIL_USER_NOT_FOUND, details);
  }

  static SendVerifyEmailInvalidAddress(message = 'Invalid Email Address', details?: any) {
    return new ApiError(message, HttpStatusCode.BAD_REQUEST, ApiErrorCode.SEND_VERIFY_EMAIL_INVALID_ADDRESS, details);
  }
}
