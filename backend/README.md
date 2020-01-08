# Backend

## Requirements

- Node.js v10.16.2 or later
- `yarn` (`npm install --global yarn`)
- MySQL database

## Installation

```sh
yarn install
```

Copy `./.env.template` to `./.env` and add DB connection configuration.

Run SQL seed script `./db/seed.sql` in MySQL to initialize tables and data.

## Run Local Dev Server

```sh
yarn dev
```

Open [localhost:3001](http://localhost:3001/).

## Production Build

```sh
yarn start
```

## Run On Server

Use SSH to login to server and run this:

```sh
cd code/cviceni/backend
yarn install
yarn build:watch
```

Open [dev.backend.USERNAME.vse.handson.pro](http://dev.backend.USERNAME.vse.handson.pro/) (replace `USERNAME` with your login).

Now you can edit code in Atom. To stop editing switch back to running SSH, press <kbd>Ctrl</kbd>+<kbd>C</kbd> and log off.

## Format Code

```sh
yarn prettier
```
