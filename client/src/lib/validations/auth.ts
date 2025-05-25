import { z } from 'zod';
import { emailSchema, codeSchema, passwordSchema } from '@/lib/validations/base';

// Sign Up
export const SignUpSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name cannot be empty'),
  email: emailSchema,
  password: passwordSchema,
});

// Sign In
export const SignInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Verify Email
export const VerifyEmailSchema = z.object({
  email: emailSchema,
  code: codeSchema,
});

// Forgot Password
export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset Password
export const ResetPasswordSchema = z.object({
  email: emailSchema,
  code: codeSchema,
  newPassword: passwordSchema,
});

// DTO types
export type SignUpDTO = z.infer<typeof SignUpSchema>;
export type SignInDTO = z.infer<typeof SignInSchema>;
export type VerifyEmailDTO = z.infer<typeof VerifyEmailSchema>;
export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;
