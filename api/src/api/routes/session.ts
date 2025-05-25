import { Router } from 'express';

import { SessionController } from '../controllers/session';
import { SessionValidator } from '../validators/session';
import { SessionService } from '../services/session';
import { authMiddleware } from '../middlewares/auth';

export const sessionRouter = Router();

const sessionService = new SessionService();
const sessionValidator = new SessionValidator();
const sessionController = new SessionController(sessionValidator, sessionService);

// Session routes
sessionRouter.get('/', authMiddleware, sessionController.getSessionsByUserId);
sessionRouter.delete('/:id', authMiddleware, sessionController.deleteSessionById);
