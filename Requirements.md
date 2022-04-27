## Requirements

- Use [NestJs](https://github.com/nestjs/nest) to create a restful-API using the db scheme and the endpoint description in the AppIndex
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

## AppIndex

#### Database
The database structure should be the following:

```bash
#User table:

id    primary key	
username
password 	
```

 
```bash
#Profile table:

id        primary key
userId    foreign key (User)
addressId foreign key (Address)
name
```

 
```bash
#Address table:

id      primary key
cityId	foreign key (City)
street
```

 
```bash
#City table:

id 	primary key
countryId
name
```
 
```bash
#Country table:

id 	primary key
name
```
 
Feel free to initialize the city and country tables for simplicity.

#### REST-API:
The API's endpoints:

 
| Method      | Description |
| ----------- | ----------- |
| POST | Creates a user given (username,password,name,anddres,cityId)|
| POST | returns a valid JWT token given (username,password)|
| GET  | Return a relevant user profile given a valid JWT token in a Authorization header with following structure|
```
{
  "id":1,
  "name":"Juan Luis",
  "address":{
     "street": "Dam square",
     "city":"Amsterdam",
     "country":"Netherlands"
   }
}
```
