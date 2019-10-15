import dotenv from 'dotenv';
import express from 'express';

import { quacks } from './mocks';

dotenv.config();
dotenv.config({ path: '.env.local' });

const { PORT = 3001 } = process.env;

const app = express();

app.use('/quack/:quackId', (req, res, next) => {
  const { quackId } = req.params;
  const quack = quacks.find(item => Number(item.id) === Number(quackId));

  if (!quack) {
    res.status(404);
    res.json({ error: true, msg: 'No quacks for you!' });
    return;
  }
  res.json(quack);
});

app.use('/quack', (req, res, next) => {
  res.json(quacks);
});

app.use('/user', (req, res, next) => {
  res.send(`User`);
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}!`);
});
