CREATE SCHEMA IF NOT EXISTS db;

CREATE TABLE IF NOT EXISTS db.user (
  id SERIAL PRIMARY KEY,
  username varchar(250) NOT NULL,
  password varchar(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS db.country (
  id SERIAL PRIMARY KEY,
  name varchar(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS db.city (
  id SERIAL PRIMARY KEY,
  countryId INT NOT NULL,
  name varchar(250) NOT NULL,
  CONSTRAINT countryFK
      FOREIGN KEY(countryId)
    REFERENCES db.country(id)
);

CREATE TABLE IF NOT EXISTS db.address (
  id SERIAL PRIMARY KEY,
  cityId INT NOT NULL,
  street varchar(250) NOT NULL,
  CONSTRAINT cityFK
      FOREIGN KEY(cityId)
    REFERENCES db.city(id)
);

CREATE TABLE IF NOT EXISTS db.profile (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  addressId INT NOT NULL,
  name varchar(250) NOT NULL,
  CONSTRAINT userFK
      FOREIGN KEY(userId)
    REFERENCES db.user(id),
  CONSTRAINT addressFK
      FOREIGN KEY(addressId)
    REFERENCES db.address(id)
);
