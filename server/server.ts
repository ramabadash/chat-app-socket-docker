/***** VARIABLES *****/
// Importing module
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
// Import types
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
} from './@types/socket/types';
// Create server
const app = express();
const PORT: Number = 4000;
const http = require('http').createServer(app);
// io
export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents
>(http, {
  cors: { origin: ['http://localhost:3000'] },
});
import { onConnection } from './controller/socketConnection';

// Middlewares
app.use(cors());
app.use(express.json());

io.on('connection', onConnection); // On socket connection

// Server setup
http.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
