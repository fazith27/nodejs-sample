FROM node:current-buster-slim

WORKDIR /

COPY package.json .
COPY index.js .
COPY start.js .

RUN npm install --production

EXPOSE 3000
CMD [ "npm", "start" ]