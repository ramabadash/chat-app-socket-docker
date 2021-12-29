import React from 'react';
import { User } from '../../../server/@types/db/types';

function UsersList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(({ id, name }) => (
        <li
          key={id}
          onClick={() => {
            console.log('the id', id);
          }}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
