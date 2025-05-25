import { Router } from 'express';

import { UserController } from '../controllers/user';
import { UserValidator } from '../validators/user';
import { UserService } from '../services/user';
import { authMiddleware } from '../middlewares/auth';

export const userRouter = Router();

const userService = new UserService();
const userValidator = new UserValidator();
const userController = new UserController(userValidator, userService);

// User routes
userRouter.put('/:id', authMiddleware, userController.updateUserById);
userRouter.delete('/:id', authMiddleware, userController.deleteUserById);
