import { io } from '../server';
import { Message } from '../@types/socket/types';
const moment = require('moment');

export const onMessage = ({ name, message, to }: Message) => {
  console.log('to', to);

  if (!to) {
    io.emit('replay', { name, message, timeStamp: moment().format('lll') });
  } else {
    io.to(to).emit('replay', {
      name,
      message,
      timeStamp: moment().format('lll'),
    });
  }
};
