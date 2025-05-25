import { z } from 'zod';

export const CreateUserRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().url().optional(),
});

export const UpdateUserRequestSchema = z.object({
  firstName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().nullable().optional(),
  isEmailVerified: z.boolean().optional(),
});

export const UpdateUserPasswordRequestSchema = z.object({
  userId: z.string().min(1),
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const DeleteUserRequestSchema = z.object({
  userId: z.string().min(1),
});

export type CreateUserRequestDTO = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequestDTO = z.infer<typeof UpdateUserRequestSchema>;
export type UpdateUserPasswordRequestDTO = z.infer<typeof UpdateUserPasswordRequestSchema>;
export type DeleteUserRequestDTO = z.infer<typeof DeleteUserRequestSchema>;
