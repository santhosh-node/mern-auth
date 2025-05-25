import { UserDocument } from '../_types';
import { BaseRepository } from './base';
import { UserModel } from '../models/user';
import { CreateUserRequestDTO } from '../../../api/_types/user';
import { Encrypt } from '../../../shared/utils/base';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(UserModel);
  }

  async create(data: CreateUserRequestDTO) {
    const { hash, salt } = Encrypt.hashValue(data.password);
    const user = this.model.create({
      ...data,
      passwordHash: hash,
      passwordSalt: salt,
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email });
  }

  async validatePassword(password: string, user: UserDocument): Promise<boolean> {
    return Encrypt.compare(password, user.passwordSalt, user.passwordHash);
  }

  async updatePassword(userId: string, newPassword: string): Promise<UserDocument | null> {
    const { hash, salt } = Encrypt.hashValue(newPassword);

    return this.model.findByIdAndUpdate(
      userId,
      {
        passwordHash: hash,
        passwordSalt: salt,
      },
      { new: true }
    );
  }
}
