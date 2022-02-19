import USERS from '../db/users';
import MESSAGES from '../db/messages';

export const getNameById = (id: string | undefined) => {
  if (id) {
    for (const user of USERS) {
      if (user.id === id) {
        return user.name;
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
    if (message.to === username || message.name === username || message.to === '') {
      messages.push(message);
    }
  }
  return messages;
};
