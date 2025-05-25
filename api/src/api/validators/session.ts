import {
  CreateSessionRequestSchema,
  DeleteSessionRequestSchema,
  DeleteSessionsByUserIdRequestSchema,
  UpdateSessionRequestSchema,
} from '../_types/session';

export class SessionValidator {
  createSession = (data: unknown) => CreateSessionRequestSchema.parse(data);
  updateSessionById = (data: unknown) => UpdateSessionRequestSchema.parse(data);
  deleteSessionById = (data: unknown) => DeleteSessionRequestSchema.parse(data);
  deleteSessionsByUserId = (data: unknown) => DeleteSessionsByUserIdRequestSchema.parse(data);
}
