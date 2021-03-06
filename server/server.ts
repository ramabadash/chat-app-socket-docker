/***** VARIABLES *****/
// Importing module
import express, { Response } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import path from 'path';
// Import types
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
} from './@types/socket/types';
// Create server
const app = express();
const PORT: Number = 4000;
export const http = require('http').createServer(app);
// io
export const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents>(http, {
  cors: { origin: ['http://localhost:3000'] },
});
// Functions
import { onConnection } from './controller/socketConnection';
// Routers
import userRouter from './routers/user';
// Middlewares
import errorHandler from './middlewares/errorHandler';

/***** MIDDLEWARES *****/
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(express.json());

/***** IO *****/
io.on('connection', onConnection); // On socket connection

/***** ROUTERS *****/
//Static files
app.use(express.static(path.join(__dirname, './client/build/')));
app.get('/', (_, res: Response) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.use('/users', userRouter);

app.use(errorHandler);

export const httpServer = http.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
