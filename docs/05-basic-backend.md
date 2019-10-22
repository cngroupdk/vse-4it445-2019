# 5th Practical Class: Basic Backend

**Checkout current git branch:**

```
cd code/cviceni/
git add .
git stash
git fetch --all
git checkout practical-05

cd backend
yarn install
yarn build:watch
```

**Please remember that `yarn build:watch` have to be running while you are editing backend files!**

## ExpressJS

- simple web framework: [ExpressJS](https://expressjs.com/)
- open `backend/src/index.js` and change it to:

```js
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
dotenv.config({ path: '.env.local' });

const { PORT = 3001 } = process.env;

const app = express();

app.use('/quacks', (req, res, next) => {
  res.send('QUACK QUACK');
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}!`);
});
```

If you are using hosting server open: [dev.backend.USERNAME.vse.handson.pro](http://dev.backend.USERNAME.vse.handson.pro/) (replace `USERNAME` with your login).
If you are developing locally open: [localhost:3001](http://localhost:3001/).
