import { SessionDocument } from '../_types';
import { SessionModel } from '../models/session';
import { BaseRepository } from './base';
import { Types } from 'mongoose';

export class SessionRepository extends BaseRepository<SessionDocument> {
  constructor() {
    super(SessionModel);
  }

  async findManyByUserId(userId: string | Types.ObjectId) {
    return this.find({ userId: this.toObjectId(userId) });
  }

  async deleteManyByUserId(userId: string | Types.ObjectId) {
    return this.model
      .deleteMany({
        userId,
      })
      .exec();
  }
}
