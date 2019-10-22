import { Router } from 'express';

import quackRoutes from './modules/quack/quackRoutes';
import userRoutes from './modules/user/userRoutes';

const router = Router();

// Link all modules here
router.use('/api/quack', quackRoutes);
router.use('/api/user', userRoutes);

export default router;
