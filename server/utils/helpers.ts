import USERS from '../db/users';

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
