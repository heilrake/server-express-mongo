import express from 'express';
import { authRouter } from './core/auth/router';
import { profileRouter } from './core/profile/router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

export { router as appRouter };
