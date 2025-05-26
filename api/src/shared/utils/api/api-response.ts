import { CookieOptions, Response } from 'express';
import { ApiErrorCode, HttpStatusCode, NODE_ENV } from '../../constants';

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'none',
  path: '/',
};

export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  status: HttpStatusCode;
  data?: T;
  errorCode?: ApiErrorCode;
  details?: any;

  constructor(success: boolean, message: string, status: HttpStatusCode, data?: T, errorCode?: ApiErrorCode, details?: any) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.data = data;
    this.errorCode = errorCode;
    this.details = details;
  }

  static sendSuccess<T>(
    res: Response,
    {
      data,
      message = 'Success',
      status = HttpStatusCode.OK,
      details,
    }: { data?: T; message?: string; status?: HttpStatusCode; details?: any }
  ) {
    const response = new ApiResponse<T>(true, message, status, data, undefined, details);
    res.status(status).json(response);
  }

  static sendError(
    res: Response,
    {
      message = 'Error',
      status = HttpStatusCode.INTERNAL_SERVER_ERROR,
      errorCode,
      details,
    }: { message?: string; status?: HttpStatusCode; errorCode?: ApiErrorCode; details?: any }
  ) {
    const response = new ApiResponse(false, message, status, undefined, errorCode, details);
    res.status(status).json(response);
  }

  static setCookie(res: Response, { name, value, options = {} }: { name: string; value: string; options?: CookieOptions }) {
    res.cookie(name, value, { ...defaultOptions, ...options });
  }

  static clearCookie(res: Response, { name, options = {} }: { name: string; options?: CookieOptions }) {
    res.clearCookie(name, { ...defaultOptions, ...options });
  }
}
