import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { DB_CONNECTION_KEY } from '../../libs/connection';

const router = Router();

const jwtSecret = 'ThisIsAlsoVerySecureString';

router.use('/signup', async (req, res, next) => {
  const dbConnection = req[DB_CONNECTION_KEY];
  const data = req.body;
  const { email, password } = data;
  const mockName = 'mockName';
  const mockScreenName = 'mockScreenName';
  const mockProfileImageUrl = 'http://mrmrs.cc/photos/p/8.jpg';

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (id, email, password, name, screenName, profileImageUrl) 
  VALUES (NULL, ?, ?, ?, ?, ?);`,
    [email, password, mockName, mockScreenName, mockProfileImageUrl],
  );

  console.log('DB response', dbResponse);

  const token = jwt.sign({ id: dbResponse.insertId }, jwtSecret);

  const userObject = {
    id: dbResponse.insertId,
    email,
    name: mockName,
    screenName: mockScreenName,
    profileImageUrl: mockProfileImageUrl,
  };

  res.json({ user: userObject, token: token });
  return;
});

export default router;
