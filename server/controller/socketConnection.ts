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
    message: 'Enter to the chat',
  });

  io.emit('userActivity', USERS); // Send user activity details

  /***** ON MESSAGE *****/
  // On message event reply to the client
  socket.on('message', ({ name, message, to }) => {
    const messageObj = { name, message, to };
    onMessage(messageObj, socket.id);
  });

  /***** ON TYPING *****/
  socket.on('userTyping', ({ name, type }) => {
    io.emit('userTypingReplay', { name, type });
  });

  /***** ON DISCONNECTION *****/
  socket.on('disconnect', () => {
    onDisconnected(name, socket); // On user disconnecting
  });
};
