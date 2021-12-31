import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** COMPONENTS *****/
import UserItem from './UserItem';
/***** STYLE *****/
import '../styles/UsersList.css';

/* ---------------------- COMPONENT ----------------------  */

function UsersList() {
  /***** STATE *****/
  const connectedUsers = useAppSelector(
    ({ chatReducer }) => chatReducer.connectedUsers
  );

  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  return (
    <div className='users-list-container'>
      <ul>
        {connectedUsers.map(({ id, name }) => {
          if (username !== name) {
            return <UserItem id={id} name={name} />;
          }
        })}
      </ul>
    </div>
  );
}

export default UsersList;
