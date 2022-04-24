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

INSERT INTO db.country
  (id, name)
VALUES
  (1, 'Argentina'),
  (2, 'Uruguay'),
  (3, 'Chile'),
  (4, 'Bolivia'),
  (5, 'Paraguay'),
  (6, 'Brasil');

INSERT INTO db.city
  (id, countryId, name)
VALUES
  (1, 1, 'Buenos Aires'),
  (2, 1, 'Cordoba'),
  (3, 1, 'Santa Fe'),
  (4, 2, 'Montevideo'),
  (5, 2, 'Colonia'),
  (6, 3, 'Valparaiso'),
  (7, 3, 'Santiago'),
  (8, 4, 'La Paz'),
  (9, 4, 'Cochabamba'),
  (10, 5, 'Asuncion'),
  (11, 6, 'Rio de Janeiro');
