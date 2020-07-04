# Config list

In order to launch project, proper configuration needs to be performed.

## Service configuration

You must create `.env` file inside `/service` folder.

Variables:

```env
PORT=3000 # Server port, default 3000

DB_HOST=localhost # Postgres server host, default 'localhost'

DB_PORT=5432 # Postgres server port, default 5432

DB_USERNAME # Postgres role username, required

DB_PASSWORD # Postgres role password, required

DB_DATABASE # Postgres target database
```
