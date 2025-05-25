import { SignOptions } from 'jsonwebtoken';

export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Missing required environment variable: ${key}`);
};

export const getEnvAsString = (key: string, defaultValue?: string): string => getEnv(key, defaultValue);

export const getEnvAsNumber = (key: string, defaultValue?: number): number => {
  const value = getEnv(key, defaultValue?.toString());
  const num = Number(value);
  if (isNaN(num)) throw new Error(`Env var ${key} is not a valid number`);
  return num;
};

export const getEnvAsBoolean = (key: string, defaultValue?: boolean): boolean => {
  const value = getEnv(key, defaultValue?.toString()).toLowerCase();
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`Env var ${key} is not a valid boolean`);
};

export const getEnvAsJwtExpires = (key: string, defaultValue?: string): SignOptions['expiresIn'] => {
  const value = getEnv(key, defaultValue);
  const match = value.match(/^(\d+)([smhdw])$/);
  if (!match) throw new Error(`Env var ${key} must be like "15m", "1h", "2d", or "1w"`);

  return value as SignOptions['expiresIn'];
};
