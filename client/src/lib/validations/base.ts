import { z } from 'zod';

export const emailSchema = z.string({ required_error: 'Email is required' }).email('Invalid email address');

export const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(6, 'Password must be at least 6 characters');

export const codeSchema = z
  .string({ required_error: 'Verification code is required' })
  .min(1, 'Verification code cannot be empty');
