FROM node:14-alpine as build-stage

WORKDIR /app
ARG project

COPY package*.json ./
RUN npm install --unsafe-perm=true --allow-root
COPY . .
RUN npm run build:triber -- --output-path=./dist/

FROM nginx:alpine
RUN rm -rf /var/www/html/*
COPY --from=build-stage /app/dist/ /var/www/html/
