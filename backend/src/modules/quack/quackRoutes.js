import { Router } from 'express';

import { DB_CONNECTION_KEY } from '../../libs/connection';

const router = Router();

router.use('/addNew', async (req, res, next) => {
  const dbConnection = req[DB_CONNECTION_KEY];
  const data = req.body;
  const { name, screenName, profileImageUrl } = data;
  console.log('incoming data', data);

  const dbResponse = await dbConnection.query(
    `INSERT INTO quack (id, name, screenName, profileImageUrl) 
    VALUES (NULL, '${name}', '${screenName}', '${profileImageUrl}');`,
  );

  console.log('DB response', dbResponse);

  res.status(404);
  res.json({ error: true, msg: 'Něco' });
  return;
});

router.use('/:quackId', async (req, res, next) => {
  const { quackId } = req.params;
  const quackIdNumber = Number(quackId);

  if (!quackIdNumber) {
    res.status(404);
    res.json({ error: true, msg: 'Wrong input!' });
    return;
  }

  const dbConnection = req[DB_CONNECTION_KEY];
  const quackFromDb = await dbConnection.query(
    `SELECT * FROM quack WHERE id = ${quackId}`,
  );

  const quack = quackFromDb[0];

  if (!quack) {
    res.status(404);
    res.json({ error: true, msg: 'No quacks for you!' });
    return;
  }
  res.json(quack);
});

router.use('/', async (req, res, next) => {
  const dbConnection = req[DB_CONNECTION_KEY];
  const quackFromDb = await dbConnection.query('SELECT * FROM `quack` WHERE 1');

  console.log('test', quackFromDb);
  res.json(quackFromDb);
});

export default router;
