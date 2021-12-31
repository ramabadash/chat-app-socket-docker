const moment = require('moment');
import { io } from '../server';
import { Message } from '../@types/socket/types';
// Helpers
import { getNameById } from '../utils/helpers';

export const onMessage = (message: Message, id: string) => {
  const messageObj = {
    name: message.name,
    message: message.message,
    to: getNameById(message.to),
  };

  if (!message.to) {
    io.emit('replay', { ...messageObj, timeStamp: moment().format('lll') });
  } else {
    io.to([message.to, id]).emit('replay', {
      ...messageObj,
      timeStamp: moment().format('lll'),
    });
  }
};
