import USERS from '../db/users';
import MESSAGES from '../db/messages';

// Get socket id by username
export const getIdByName = (name: string | undefined) => {
  if (name) {
    for (const user of USERS) {
      if (user.name === name) {
        return user.id;
      }
    }
  }
  return '';
};

// Get messages from the messages list that send to this user
export const getUsersMessages = (username: string) => {
  const messages = [];
  for (const message of MESSAGES) {
    // Messages for the user / writhen by the user / to general chat room
    if (message.to === username || message.name === username || message.to === 'Group') {
      messages.push(message);
    }
  }
  return messages;
};
