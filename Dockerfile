FROM node:10.23.0 AS development

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build
