import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// Actions
import { setMessageDestination } from '../reducers/chatReducer';

function UsersList() {
  /***** STATE *****/
  const connectedUsers = useAppSelector(
    ({ chatReducer }) => chatReducer.connectedUsers
  );

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  return (
    <div className='users-list-container'>
      <h3>USERS:</h3>
      <ul>
        {connectedUsers.map(({ id, name }) => (
          <li
            key={id}
            onClick={() => {
              dispatch(setMessageDestination({ room: id }));
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
