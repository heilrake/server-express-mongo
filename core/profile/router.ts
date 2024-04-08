import express from 'express';
import { profileCtrl } from './controllers';
import { authMiddleware } from '../../middlewares/auth-middleware';

const router = express.Router();
router.get('/', authMiddleware, profileCtrl.profile);

export { router as profileRouter };
