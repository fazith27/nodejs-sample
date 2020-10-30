FROM node:latest

WORKDIR /

COPY package.json .
COPY index.js .
COPY start.js .

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]