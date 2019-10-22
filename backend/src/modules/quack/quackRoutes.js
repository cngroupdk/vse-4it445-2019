import { Router } from 'express';

import { quacks } from './mocks';

const router = Router();

router.use('/:quackId', (req, res, next) => {
  const { quackId } = req.params;
  const quack = quacks.find(item => Number(item.id) === Number(quackId));

  if (!quack) {
    res.status(404);
    res.json({ error: true, msg: 'No quacks for you!' });
    return;
  }
  res.json(quack);
});

router.use('/', (req, res, next) => {
  res.json(quacks);
});

export default router;
