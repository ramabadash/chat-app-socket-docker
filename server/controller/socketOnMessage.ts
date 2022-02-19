const moment = require('moment');
import { io } from '../server';
import { Message } from '../@types/socket/types';
// Helpers
import { getNameById } from '../utils/helpers';
// DB
import MESSAGES from '../db/messages';

export const onMessage = (message: Message, id: string) => {
  const messageObj = {
    name: message.name,
    message: message.message,
    to: getNameById(message.to),
  };

  console.log(messageObj);
  console.log(message);

  MESSAGES.push({ ...messageObj, timeStamp: moment().format('lll') }); // Add message to the messages list

  if (!message.to) {
    io.emit('replay', { ...messageObj, timeStamp: moment().format('lll') });
  } else {
    io.to([message.to, id]).emit('replay', {
      ...messageObj,
      timeStamp: moment().format('lll'),
    });
  }
};
