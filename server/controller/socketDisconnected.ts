// DB
import USERS from '../db/users';
// io
import { io } from '../server';
// Types
import { SocketType } from '../@types/socket/types';

export const onDisconnected = (name: string, socket: SocketType) => {
  io.emit('replay', { name, message: 'disconnected' }); // Send disconnected user message

  // Update users list - user disconnected
  const user = USERS.find(user => user.name === name);
  if (!user) {
    socket.disconnect(true);
    throw { status: '400', message: 'User not found' };
  }
  user.id = '';
  user.status = 'offline';

  // Send user activity details
  io.emit('userActivity', USERS);
};
