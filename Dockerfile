FROM node:16-alpine3.12

WORKDIR /app

COPY --chown=node:node ./server/package.json .
COPY --chown=node:node ./server/package-lock.json .
RUN npm ci --only-production

# Build the client
COPY --chown=node:node ./client/build ./client/build
# RUN cd ./client 
# RUN npm i 
# RUN npm run build
# RUN cd ..
# Build the server
COPY --chown=node:node ./server/build .

# Run our app.
CMD ["node", "server.js"]