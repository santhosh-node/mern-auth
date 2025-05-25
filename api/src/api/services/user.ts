import { UserRepository } from '../../resources/database/repositories/user';
import type { UpdateUserRequestDTO, UpdateUserPasswordRequestDTO, DeleteUserRequestDTO } from '../_types/user';

const userRepo = new UserRepository();

export class UserService {
  async updateUserById(data: UpdateUserRequestDTO) {
    // TODO: implement
  }

  async updateUserPassword(data: UpdateUserPasswordRequestDTO) {
    // TODO: implement
  }

  async deleteUserById(data: DeleteUserRequestDTO) {
    // TODO: implement
  }
}
