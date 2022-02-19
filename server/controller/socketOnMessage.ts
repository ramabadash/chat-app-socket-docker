const moment = require('moment');
import { io } from '../server';
import { Message } from '../@types/socket/types';
// Helpers
import { getIdByName } from '../utils/helpers';
// DB
import MESSAGES from '../db/messages';

export const onMessage = (message: Message, id: string) => {
  const messageObj = {
    name: message.name,
    message: message.message,
    to: message.to,
  };

  console.log(messageObj);
  console.log(message);

  // Message to general chat room
  if (message.to === 'Group') {
    io.emit('replay', { ...messageObj, timeStamp: moment().format('lll') });
  } else {
    const toUserId = getIdByName(message.to); // If user is online get his socket id

    if (toUserId) {
      // The message is to online user - send him the message
      io.to([toUserId, id]).emit('replay', {
        ...messageObj,
        timeStamp: moment().format('lll'),
      });
    } else {
      // The message is to offline user - emit only to the sender
      io.to(id).emit('replay', { ...messageObj, timeStamp: moment().format('lll') });
    }
  }
  // Save the message to DB for later messages history
  MESSAGES.push({ ...messageObj, timeStamp: moment().format('lll') });
};
