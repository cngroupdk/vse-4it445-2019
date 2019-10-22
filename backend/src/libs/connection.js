import mariadb from 'mariadb';
import dotenv from 'dotenv';

export const DB_CONNECTION_KEY = 'dbConnection';

dotenv.config();
dotenv.config({ path: '.env' });

const { DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = process.env;

const pool = mariadb.createPool({
  host: 'localhost',
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 5,
});

const getConnection = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    throw err;
  }
};

export const addDbToRequest = async (req, res, next) => {
  const connection = await getConnection();
  req[DB_CONNECTION_KEY] = connection;

  next();

  if (req[DB_CONNECTION_KEY]) {
    req[DB_CONNECTION_KEY].end();
  }
};
