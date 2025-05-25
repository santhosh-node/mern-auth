import { SignOptions } from 'jsonwebtoken';

export const jwtExpiresToDate = (expiresIn: SignOptions['expiresIn']): Date => {
  const { TIME_UNITS } = require('../../constants/time');

  if (typeof expiresIn === 'number') {
    if (expiresIn <= 0) throw new Error(`Invalid JWT duration: ${expiresIn}`);
    return new Date(Date.now() + expiresIn * 1000);
  }

  if (typeof expiresIn !== 'string') {
    throw new Error(`Invalid JWT expiresIn type: ${typeof expiresIn}`);
  }

  const regex = /^(\d+)([smhdw])$/;
  const match = expiresIn.match(regex);

  if (!match) {
    throw new Error(`Invalid JWT expires format: ${expiresIn}`);
  }

  const [, numStr, unit] = match;
  const num = Number(numStr);

  if (num <= 0 || isNaN(num)) {
    throw new Error(`Invalid duration number: ${numStr}`);
  }

  const multiplier = TIME_UNITS[unit as keyof typeof TIME_UNITS];

  if (!multiplier) {
    throw new Error(`Invalid time unit: ${unit}`);
  }

  return new Date(Date.now() + num * multiplier);
};

export const fiveMinutesAgo = () => new Date(Date.now() - 5 * 60 * 1000);

export const fifteenMinutesFromNow = () => new Date(Date.now() + 15 * 60 * 1000);

export const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);

export const oneYearFromNow = () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export const thirtyDaysFromNow = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
