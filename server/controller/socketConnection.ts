// DB
import USERS from '../db/users';
// io
import { io } from '../server';
// Types
import { SocketType } from '../@types/socket/types';
// Functions
import { onMessage } from './socketOnMessage';
import { onDisconnected } from './socketDisconnected';

/***** CONNECTION *****/
export const onConnection = (socket: SocketType) => {
  console.log('connected user');
  const name = socket.handshake.auth.username;

  USERS.push({ id: socket.id, name });
  console.log(USERS);

  // Update users about the login
  socket.broadcast.emit('replay', {
    name,
    message: 'Enter to chat',
  });
  // Send user activity details
  io.emit('userActivity', USERS);

  socket.on('message', onMessage); // On message event reply to the client

  socket.on('disconnect', () => {
    onDisconnected(name, socket); // On user disconnecting
  });
};
