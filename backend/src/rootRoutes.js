import { Router } from 'express';

import quackRoutes from './modules/quack/quackRoutes';
import userRoutes from './modules/user/userRoutes';
import authRoutes from './modules/auth/authRoutes';

const router = Router();

// Link all modules here
router.use('/api/quack', quackRoutes);
router.use('/api/user', userRoutes);
router.use('/api/auth', authRoutes);

export default router;
