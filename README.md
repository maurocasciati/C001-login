## Requirements

- Use [NestJs](https://github.com/nestjs/nest) to create a restful-API using the db scheme and the endpoint description in the [AppIndex](https://github.com/maurocasciati/interview-challenge-101/blob/main/Requirements.md#appindex)
- Try not to use the ORM for serialization and making the query
- Use custom validation pipe /decorators 
- Document how to fire up the project
- Please use a git based version control and share the repo with us
- Use redis or any other in-memory cache technique.  
- Create docker containers for the user service with it's database. The system consists of three containers:
  - A relational database service of your choice (ex: mysql, mssql, postgres, etc...)
  - A node js service running the NestJs framework
  - A redis instance
- Extra for a full stack position:
  - Create react app (looks are not important) using the endpoints you created in NestJs and ship it with the project (Login/Register/Profile)

## Brief overview

The core application is located directly in the main `AppModule`. It contains user and profile creation. Then you will find three more modules:
- `AuthModule` which contains:
  - The `AuthGuard` used to secure `GET /api/profile` endpoint
  - The `AuthService`, `JWTService` and `JWTAuthStrategy` to process login and generate the JWT token
  - The `AuthController` to expose `/auth` endpoint to log in
- `DatabaseModule` to connect to [PostgreSQL](https://www.postgresql.org/). Since using an ORM was not encouraged, instead of having repositories for the different entities, I created a custom service by using [pg node-postgres client](https://node-postgres.com/) for all DB queries.
- `RedisCacheModule` which uses [NestJS cache manager](https://www.npmjs.com/package/cache-manager) with [Redis](https://redis.io/) as a data store to save a cache for recently retrieved Profiles. 
  - Note: I left a console log on propouse [at this line](https://github.com/maurocasciati/interview-challenge-101/blob/main/src/app.service.ts#L38) to easily see if the Profile requested is comming from the Database.
  - Note: Cache time to live timer is set to 60 seconds.

## Running the app

The only pre requisite is that you need to have [Docker](https://www.docker.com/get-started/) installed in your machine.
After that, you can set up the applicacion by simply running the docker containers. You can use the environment configuration file provided in this repo:

```bash
$ docker-compose --env-file src/utils/credentials.env up
```

## Using the app

1. Create a user by doing a POST request to `/api/users` with the user data:
```bash
curl --location --request POST 'localhost:3000/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Profile Name",
    "username": "username",
    "password": "pa$$word",
    "address": "Street 1234",
    "cityId": 1
}'
```

2. Before getting you profile information again, you will also need to log in by doing a POST to `/auth`:

```bash
curl --location --request POST 'localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "username",
    "password": "pa$$word"
}'
```

3. All set! Now you can use the retrieved JWT token to GET you profile with `/api/profile`
```bash
curl --location --request GET 'http://localhost:3000/api/profile' \
--header 'Authorization: Bearer {JWT Token}'
```

