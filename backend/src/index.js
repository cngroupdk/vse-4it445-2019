import dotenv from 'dotenv';
import express from 'express';

import { quacks, users } from './mocks';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();

const { PORT = 3001 } = process.env;

app.use('/quack/:quackId', (req, res, next) => {
  const { quackId } = req.params;
  const quack = quacks.find(item => Number(item.id) === Number(quackId));

  if (!quack) {
    res.status(404);
    return res.json({ error: true, msg: 'No quacks for you!' });
  }

  res.json(quack);
});

app.use('/quack', (req, res, next) => {
  res.json(quacks);
});

app.use('/user', (req, res, next) => {
  res.json(users);
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}!`);
});
