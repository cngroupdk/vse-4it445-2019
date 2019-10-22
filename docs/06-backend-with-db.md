# 6th Practical Class: Backend with DB

Use DB which is provided on server. Connection details are in e-mail that was sent. Back-end can connect to DB only from that server, so you need to use remote development on server. Or install MySQL db locally / tunnel wia SSH / run DB in docker. Connection to server is easiest :)

### Connect to DB

```
cp .env.template .env
```

- add DB connection info to `.env` file
- check if DB is working on url `<server>/testDb` - `localhost:3001/testDb`

### Create new module

- create new table using phpMyAdmin
- create new module in modules folder
- back-up sql commands to .sql file to it's module
- create `routes.js` file and link it in `rootRoutes.js`
- implement module behvior

### Useful links

- [Postman](https://www.getpostman.com/) - great tool for REST API's debugging
- [MySQL cheatsheet](https://devhints.io/mysql)
