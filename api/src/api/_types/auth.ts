import { z } from 'zod';

export const SignUpRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
});

export const SignInRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
});

export const SignOutRequestSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
});

export const VerifyEmailRequestSchema = z.object({
  email: z.string().email(),
  code: z.string(),
});

export const ResendVerificationEmailRequestSchema = z.object({
  email: z.string().email(),
});

export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordRequestSchema = z.object({
  email: z.string().email(),
  code: z.string(),
  newPassword: z.string().min(6),
});

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

export type SignUpRequestDTO = z.infer<typeof SignUpRequestSchema>;
export type SignInRequestDTO = z.infer<typeof SignInRequestSchema>;
export type SignOutRequestDTO = z.infer<typeof SignOutRequestSchema>;
export type VerifyEmailRequestDTO = z.infer<typeof VerifyEmailRequestSchema>;
export type ResendVerificationEmailRequestDTO = z.infer<typeof ResendVerificationEmailRequestSchema>;
export type ForgotPasswordRequestDTO = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequestDTO = z.infer<typeof ResetPasswordRequestSchema>;
export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenRequestSchema>;
