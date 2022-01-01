FROM node:16-alpine3.12

WORKDIR /app

COPY --chown=node:node ./server/package.json .
COPY --chown=node:node ./server/package-lock.json .
RUN npm ci --only-production

COPY --chown=node:node ./server/build .
COPY --chown=node:node ./client/build ./client/build/

# Run our app.
CMD ["node", "server.js"]