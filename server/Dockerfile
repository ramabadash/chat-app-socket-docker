FROM node:16.13.1-alpine3.12

COPY ["package.json", "package-lock.json*", "./back/"]

WORKDIR /back

RUN npm install 

COPY ./build .

EXPOSE 4000

CMD [ "node", "server.js" ]