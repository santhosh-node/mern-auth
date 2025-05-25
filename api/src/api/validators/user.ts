import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
  UpdateUserPasswordRequestSchema,
  DeleteUserRequestSchema,
} from '../_types/user';

export class UserValidator {
  createUser = (data: unknown) => CreateUserRequestSchema.parse(data);
  updateUserById = (data: unknown) => UpdateUserRequestSchema.parse(data);
  updateUserPassword = (data: unknown) => UpdateUserPasswordRequestSchema.parse(data);
  deleteUserById = (data: unknown) => DeleteUserRequestSchema.parse(data);
}
