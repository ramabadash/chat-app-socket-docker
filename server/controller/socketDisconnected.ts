// DB
import USERS from '../db/users';
// io
import { io } from '../server';
// Types
import { SocketType } from '../@types/socket/types';

export const onDisconnected = (name: string, socket: SocketType) => {
  io.emit('replay', { name, message: 'disconnected' }); // Send disconnected user message

  // Remove user from USERS arr
  const userIndex = USERS.indexOf({
    id: socket.id,
    name,
  }); // delete the user that disconnected
  USERS.splice(userIndex, 1);
  // Send user activity details
  io.emit('userActivity', USERS);
};
