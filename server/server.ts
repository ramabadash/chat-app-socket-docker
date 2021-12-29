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

// DB
import USERS from './db/users';

const app = express();
const PORT: Number = 4000;
const http = require('http').createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents
>(http, {
  cors: { origin: ['http://localhost:3000'] },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Handling GET / Request
app.get('/', (req, res) => {
  res.send('Welcome to typescript backend!');
});

io.on('connection', socket => {
  console.log('connected user');
  console.log({ socket });

  USERS.push({ id: socket.id });
  console.log(USERS);

  // Update users about the login
  socket.broadcast.emit('replay', {
    name: socket.id,
    message: 'Enter to chat',
  });
  // Send user activity details
  io.emit('userActivity', USERS);

  socket.on('message', ({ name, message }) => {
    io.emit('replay', { name, message });
  });

  socket.on('disconnect', () => {
    io.emit('replay', { name: socket.id, message: 'disconnected' });
    // Remove from USERS arr
    const userIndex = USERS.indexOf({ id: socket.id }); // delete the user that disconnected
    USERS.splice(userIndex, 1);
    // Send user activity details
    io.emit('userActivity', USERS);
    console.log({ USERS });
  });
});

// Server setup
http.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
