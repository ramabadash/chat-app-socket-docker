// DB
import USERS from '../db/users';
// io
import { io } from '../server';
// Types
import { SocketType } from '../@types/socket/types';
// Functions
import { onMessage } from './socketOnMessage';
import { onDisconnected } from './socketDisconnected';

export const onConnection = (socket: SocketType) => {
  /***** ON CONNECTION *****/
  console.log('connected user');
  const name = socket.handshake.auth.username;

  USERS.push({ id: socket.id, name }); // Update users list
  console.log(USERS);

  // Update users about the login by message
  socket.broadcast.emit('replay', {
    name,
    message: 'Enter to chat',
  });

  io.emit('userActivity', USERS); // Send user activity details

  /***** ON MESSAGE *****/
  socket.on('message', onMessage); // On message event reply to the client

  /***** ON DISCONNECTION *****/
  socket.on('disconnect', () => {
    onDisconnected(name, socket); // On user disconnecting
  });
};
