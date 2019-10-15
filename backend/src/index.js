import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

const { PORT = 3001 } = process.env;
