// DB
import USERS from '../db/users';
import MESSAGES from '../db/messages';
// io
import { io } from '../server';
// Types
import { SocketType } from '../@types/socket/types';
// Functions
import { onMessage } from './socketOnMessage';
import { onDisconnected } from './socketDisconnected';
import { getUsersMessages } from '../utils/helpers';

export const onConnection = (socket: SocketType) => {
  /***** ON CONNECTION *****/
  const name = socket.handshake.auth.username;

  const user = USERS.find(user => user.name === name);

  if (!user) {
    socket.disconnect(true);
    throw { status: '400', message: 'User not found' };
  }
  // Update users list
  user.id = socket.id;
  user.status = 'online';

  // Update users about the login by message
  socket.broadcast.emit('replay', {
    name,
    message: 'Enter to the chat',
    to: 'Group',
  });

  io.to(socket.id).emit('updateMessagesHistory', getUsersMessages(name)); // Send messages history to the user
  MESSAGES.push({ name, message: 'Enter to the chat', to: 'Group', timeStamp: '' }); // Add "user join" message to the messages list
  io.emit('userActivity', USERS); // Send user activity details

  /***** ON MESSAGE *****/
  // On message event reply to the client
  socket.on('message', ({ name, message, to }) => {
    const messageObj = { name, message, to };
    onMessage(messageObj, socket.id);
  });

  /***** ON TYPING *****/
  socket.on('userTyping', ({ name, type }) => {
    socket.broadcast.emit('userTypingReplay', { name, type });
  });

  /***** ON DISCONNECTION *****/
  socket.on('disconnect', () => {
    onDisconnected(name, socket); // On user disconnecting
  });
};
