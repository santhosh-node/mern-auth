import { ApiResponse, asyncHandler } from '../../shared/utils/api';
import { UserValidator } from '../validators/user';
import { UserService } from '../services/user';

export class UserController {
  constructor(
    private readonly validator: UserValidator,
    private readonly service: UserService
  ) {}

  updateUserById = asyncHandler(async (req, res) => {
    const data = { id: req.params.id, ...req.body };
    const validatedData = this.validator.updateUserById(data);
    const result = await this.service.updateUserById(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'User updated successfully' });
  });

  updateUserPassword = asyncHandler(async (req, res) => {
    const validatedData = this.validator.updateUserPassword(req.body);
    const result = await this.service.updateUserPassword(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'Password updated successfully' });
  });

  deleteUserById = asyncHandler(async (req, res) => {
    const data = { id: req.params.id };
    const validatedData = this.validator.deleteUserById(data);
    const result = await this.service.deleteUserById(validatedData);
    ApiResponse.sendSuccess(res, { data: result, message: 'User deleted successfully' });
  });
}
