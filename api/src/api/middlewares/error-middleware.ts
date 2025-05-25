import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { ApiErrorCode, HttpStatusCode } from '../../shared/constants';
import { ApiResponse } from '../../shared/utils/api';

export const errorMiddleware = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const isProd = process.env.NODE_ENV === 'production';

  let statusCode: HttpStatusCode = err.statusCode || err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  let errorCode: ApiErrorCode = err.errorCode || ApiErrorCode.SERVER_ERROR;
  let message: string = err.message || 'Internal Server Error';
  let details: any = err.details || undefined;

  // Handle JWT errors
  if (err instanceof jwt.TokenExpiredError) {
    statusCode = HttpStatusCode.UNAUTHORIZED;
    errorCode = ApiErrorCode.UNAUTHORIZED;
    message = 'JWT token has expired';
  } else if (err instanceof jwt.JsonWebTokenError) {
    statusCode = HttpStatusCode.UNAUTHORIZED;
    errorCode = ApiErrorCode.UNAUTHORIZED;
    message = 'Invalid JWT token';
  } else if (err instanceof jwt.NotBeforeError) {
    statusCode = HttpStatusCode.UNAUTHORIZED;
    errorCode = ApiErrorCode.UNAUTHORIZED;
    message = 'JWT token not active yet';

    // Handle Zod validation errors
  } else if (err instanceof ZodError) {
    statusCode = HttpStatusCode.BAD_REQUEST;
    errorCode = ApiErrorCode.VALIDATION_ERROR;
    message = 'Validation failed';
    details = err.flatten().fieldErrors;

    // Handle Mongoose validation errors
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = HttpStatusCode.BAD_REQUEST;
    errorCode = ApiErrorCode.VALIDATION_ERROR;
    message = 'Mongoose validation failed';
    details = Object.values(err.errors).map((e) => ({
      path: (e as any).path,
      message: (e as any).message,
      kind: (e as any).kind,
    }));

    // Handle Mongoose duplicate key error (e.g., unique index violation)
  } else if ((err.name === 'MongoServerError' || err.name === 'MongoError') && err.code === 11000) {
    statusCode = HttpStatusCode.CONFLICT;
    errorCode = ApiErrorCode.DUPLICATE_ENTRY;
    const keys = Object.keys(err.keyValue || {});
    message = `Duplicate value for field${keys.length > 1 ? 's' : ''}: ${keys.join(', ')}`;
    details = err.keyValue;
  }

  // Log error details
  console.error({
    type: '🔴 Error',
    method: req.method,
    url: req.originalUrl,
    statusCode,
    errorCode,
    message,
    ...(details && { details }),
    ...(!isProd && { stack: err.stack }),
  });

  ApiResponse.sendError(res, {
    message,
    status: statusCode,
    errorCode,
    details,
  });
};
