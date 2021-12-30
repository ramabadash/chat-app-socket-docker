import React from 'react';
import { useAppSelector } from '../app/hooks';

function UsersList({
  setRoom,
}: {
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}) {
  /***** STATE *****/
  const connectedUsers = useAppSelector(
    ({ chatReducer }) => chatReducer.connectedUsers
  );

  return (
    <div className='users-list-container'>
      <h3>USERS:</h3>
      <ul>
        {connectedUsers.map(({ id, name }) => (
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
