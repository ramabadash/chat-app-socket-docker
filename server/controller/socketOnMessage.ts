import { io } from '../server';
import { Message } from '../@types/socket/types';
const moment = require('moment');

export const onMessage = (message: Message, id: string) => {
  const messageObj = { name: message.name, message: message.message };

  if (!message.to) {
    io.emit('replay', { ...messageObj, timeStamp: moment().format('lll') });
  } else {
    io.to([message.to, id]).emit('replay', {
      ...messageObj,
      timeStamp: moment().format('lll'),
    });
  }
};
