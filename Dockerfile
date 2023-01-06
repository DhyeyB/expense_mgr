FROM node:14.21-alpine
RUN npm i express -g
RUN npm i nodemon -g
WORKDIR /app
COPY package.json package-lock.json ./
RUN sleep 1
RUN npm install
COPY . .
EXPOSE 7777

CMD ["nodemon", "server.js"]
