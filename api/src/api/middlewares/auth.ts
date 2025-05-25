import { SessionRepository } from '../../resources/database/repositories/session';
import { UserRepository } from '../../resources/database/repositories/user';
import { ACCESS_TOKEN_COOKIE_NAME } from '../../shared/constants';
import { ApiError, asyncHandler } from '../../shared/utils/api';
import { JwtSignPayload, JWTToken } from '../../shared/utils/base';

const userRepo = new UserRepository();
const sessionRepo = new SessionRepository();

export const authMiddleware = asyncHandler(async (req, _res, next) => {
  const cookieToken = req.cookies?.[ACCESS_TOKEN_COOKIE_NAME];
  const headerToken = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;

  const token = cookieToken || headerToken;

  if (!token) {
    throw ApiError.Unauthorized('Authorization token missing');
  }

  const decoded = JWTToken.verifyAccessToken(token) as JwtSignPayload;

  if (!decoded?.userId || !decoded?.sessionId) {
    throw ApiError.InvalidRequest('Invalid token payload');
  }

  const user = await userRepo.findById(decoded.userId);
  if (!user) {
    throw ApiError.NotFound('User not found');
  }

  const session = await sessionRepo.findById(decoded.sessionId);
  if (!session) {
    throw ApiError.NotFound('Session not found');
  }

  if (session.expiresAt && session.expiresAt < new Date()) {
    throw ApiError.Unauthorized('Session expired');
  }

  req.user = userRepo.toObject(user);
  req.session = sessionRepo.toObject(session);

  next();
});
