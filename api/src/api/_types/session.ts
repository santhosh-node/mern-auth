import { z } from 'zod';

export const CreateSessionRequestSchema = z.object({
  userId: z.string().min(1),
  userAgent: z.string().optional(),
  expiresAt: z.date(),
});

export const UpdateSessionRequestSchema = z.object({
  sessionId: z.string().min(1),
  userAgent: z.string().optional(),
  expiresAt: z.date().optional(),
});

export const DeleteSessionRequestSchema = z.object({
  sessionId: z.string().min(1),
});

export const DeleteSessionsByUserIdRequestSchema = z.object({
  userId: z.string().min(1),
});

export type CreateSessionRequestDTO = z.infer<typeof CreateSessionRequestSchema>;
export type UpdateSessionRequestDTO = z.infer<typeof UpdateSessionRequestSchema>;
export type DeleteSessionRequestDTO = z.infer<typeof DeleteSessionRequestSchema>;
export type DeleteSessionsByUserIdRequestDTO = z.infer<typeof DeleteSessionsByUserIdRequestSchema>;
