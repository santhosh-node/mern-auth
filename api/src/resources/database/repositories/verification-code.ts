import { VerificationCodeDocument, VerificationCodeType } from '../_types';
import { VerificationCodeModel } from '../models/verification-code';
import { BaseRepository } from './base';
import { Types } from 'mongoose';

export class VerificationCodeRepository extends BaseRepository<VerificationCodeDocument> {
  constructor() {
    super(VerificationCodeModel);
  }

  async findValidCode({ code, type, userId }: { userId: string | Types.ObjectId; type: VerificationCodeType; code: number }) {
    const now = new Date();
    return this.model
      .findOne({
        userId: this.toObjectId(userId),
        type,
        code,
        expiresAt: { $gt: now },
      })
      .exec();
  }

  async deleteManyByUserId(userId: string | Types.ObjectId) {
    return this.model
      .deleteMany({
        userId,
      })
      .exec();
  }
}
