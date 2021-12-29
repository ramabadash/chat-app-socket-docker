// Importing module
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

// Import types
const {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} = require('./@types/socket/types');

const app = express();
const PORT: Number = 4000;
const http = require('http').createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(http);

// Middlewares
app.use(cors());
app.use(express.json());

// Handling GET / Request
app.get('/', (req, res) => {
  res.send('Welcome to typescript backend!');
});

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('replay', { name, message });
  });

  socket.on('disconnect', () => {
    io.emit('replay', { name: 'wow', message: 'render' });
  });
});

// Server setup
http.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
