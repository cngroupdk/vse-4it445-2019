import { Router } from 'express';

const router = Router();
router.use('/', (req, res, next) => {
  res.send(`User`);
});

export default router;
