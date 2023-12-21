FROM node:21.4-alpine3.19

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE  3000

CMD [ "npm","run","start" ]