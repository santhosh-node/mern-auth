import { Request, Response, NextFunction } from 'express';
import { ApiErrorCode, HttpStatusCode } from '../../shared/constants';
import { ApiResponse } from '../../shared/utils/api';

export const notFoundMiddleware = (req: Request, res: Response, _next: NextFunction) => {
  const message = 'Resource Not Found';
  const status = HttpStatusCode.NOT_FOUND;
  const errorCode = ApiErrorCode.RESOURCE_NOT_FOUND;

  // Log warning with request details
  console.warn({
    type: '🟡 NotFound',
    method: req.method,
    url: req.originalUrl,
    status,
    message,
  });

  // Send standardized error response
  ApiResponse.sendError(res, { message, status, errorCode });
};
