FROM node:16.13.1

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY ./build .

EXPOSE 4000

CMD [ "node", "server.js" ]