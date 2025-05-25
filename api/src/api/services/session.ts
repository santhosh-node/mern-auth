import { SessionRepository } from '../../resources/database/repositories/session';

const sessionRepo = new SessionRepository();

export class SessionService {
  async getSessionsByUserId(userId: string | undefined) {
    if (userId) {
      const sessions = await sessionRepo.findManyByUserId(userId);
      const seesionsObjArr = sessionRepo.toObject(sessions);
      return seesionsObjArr;
    } else {
      return [];
    }
  }

  async deleteSessionById(id: string | undefined) {
    if (id) {
      return await sessionRepo.deleteById(id);
    } else {
      return null;
    }
  }
}
