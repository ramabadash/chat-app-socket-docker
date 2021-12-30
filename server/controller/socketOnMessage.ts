import { io } from '../server';
import { Message } from '../@types/socket/types';

export const onMessage = ({ name, message, to }: Message) => {
  console.log('to', to);

  if (!to) {
    io.emit('replay', { name, message });
  } else {
    io.to(to).emit('replay', { name, message });
  }
};
