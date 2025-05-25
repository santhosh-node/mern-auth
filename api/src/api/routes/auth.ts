import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { AuthValidator } from '../validators/auth';
import { AuthService } from '../services/auth';
import { authMiddleware } from '../middlewares/auth';

export const authRouter = Router();

const authService = new AuthService();
const authValidator = new AuthValidator();
const authController = new AuthController(authValidator, authService);

// Auth routes
authRouter.post('/sign-up', authController.signUp);
authRouter.post('/sign-in', authController.signIn);

authRouter.post('/verify-email', authController.verifyEmail);
authRouter.post('/resend-verification-email', authController.resendVerificationEmail);

authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/reset-password', authController.resetPassword);

authRouter.post('/refresh-token', authController.refreshToken);

authRouter.post('/sign-out', authMiddleware, authController.signOut);
authRouter.get('/me', authMiddleware, authController.getCurrentUser);
