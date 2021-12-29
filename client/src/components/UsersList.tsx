import React from 'react';
import { User } from '../../../server/@types/db/types';

function UsersList({
  users,
  setRoom,
}: {
  users: User[];
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <h3>USERS:</h3>
      <ul>
        {users.map(({ id, name }) => (
          <li
            key={id}
            onClick={() => {
              setRoom(id);
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
