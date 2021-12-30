// DB
import USERS from '../db/users';
// io
import { io } from '../server';
// Types
import { SocketType } from '../@types/socket/types';

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

  socket.on('message', ({ name, message, to }) => {
    console.log('to', to);

    if (!to) {
      io.emit('replay', { name, message });
    } else {
      io.to(to).emit('replay', { name, message });
    }
  });

  socket.on('disconnect', () => {
    io.emit('replay', { name, message: 'disconnected' });
    // Remove from USERS arr
    const userIndex = USERS.indexOf({
      id: socket.id,
      name,
    }); // delete the user that disconnected
    USERS.splice(userIndex, 1);
    // Send user activity details
    io.emit('userActivity', USERS);
    console.log({ USERS });
  });
};
