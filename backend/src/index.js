import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import rootRoutes from './rootRoutes';

import { addDbToRequest, DB_CONNECTION_KEY } from './libs/connection';

const { PORT = 3001 } = process.env;

const app = express();

// application wide needed middlewares
app.use(bodyParser.json());
app.use(cors());

// adds and removes connection to DB to the reqeust object
app.use(addDbToRequest);

// whole app is hidden behind rootRoutes
app.use(rootRoutes);

// usefull for testing that connection is working as it should
app.use('/testDb', async (req, res, next) => {
  console.log('This is test of DB');
  const dbConnection = req[DB_CONNECTION_KEY];
  const testQueryResult = await dbConnection.query('SELECT 1 as val');
  console.log('Data poky', testQueryResult);
  console.log('DB finished');
  res.send(`DB test ${JSON.stringify(testQueryResult)}`);
});

// 404 - not found handling
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

// launch of server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}!`);
});
