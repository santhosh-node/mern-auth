import 'dotenv/config';
import { jwtExpiresToDate } from '../utils/helpers';
import { getEnvAsJwtExpires, getEnvAsNumber, getEnvAsString } from '../utils/helpers';

export const NODE_ENV = getEnvAsString('NODE_ENV', 'development');

export const PORT = getEnvAsNumber('PORT', 3000);

export const DATABASE_URL = getEnvAsString('DATABASE_URL');

export const API_BASE_PATH = getEnvAsString('API_BASE_PATH', '/api/v1');

export const CORS_ORIGIN = getEnvAsString('CORS_ORIGIN', '*');

export const FROM_EMAIL_ADDRESS = getEnvAsString('FROM_EMAIL_ADDRESS');
export const FROM_EMAIL_PASSWORD = getEnvAsString('FROM_EMAIL_PASSWORD');

export const ACCESS_TOKEN_SECRET = getEnvAsString('ACCESS_TOKEN_SECRET');
export const REFRESH_TOKEN_SECRET = getEnvAsString('REFRESH_TOKEN_SECRET');

export const ACCESS_TOKEN_EXPIRES_IN = getEnvAsJwtExpires('ACCESS_TOKEN_EXPIRES_IN', '15m');
export const REFRESH_TOKEN_EXPIRES_IN = getEnvAsJwtExpires('REFRESH_TOKEN_EXPIRES_IN', '7d');

export const ACCESS_TOKEN_COOKIE_NAME = getEnvAsString('ACCESS_TOKEN_COOKIE_NAME', 'accessToken');
export const REFRESH_TOKEN_COOKIE_NAME = getEnvAsString('REFRESH_TOKEN_COOKIE_NAME', 'refreshToken');

export const REFRESH_TOKEN_PATH = `${API_BASE_PATH}/auth/refresh-token`;
