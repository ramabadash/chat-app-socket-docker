import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../../app/hooks';
/***** COMPONENTS *****/
import UserItem from './UserItem';
import GroupItem from './GroupItem';
/***** STYLE *****/
import './UsersList.css';

/* ---------------------- COMPONENT ----------------------  */

function UsersList() {
  /***** STATE *****/
  const connectedUsers = useAppSelector(({ chatReducer }) => chatReducer.connectedUsers);
  const groups = useAppSelector(({ chatReducer }) => chatReducer.groupChats);

  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  return (
    <div className='users-list-container'>
      <ul className='direct-messages'>
        <h2 className='users-header'>Direct messages:</h2>
        {connectedUsers.map(({ id, name, status }) => {
          if (username !== name) {
            return <UserItem key={id} id={id} name={name} status={status} />;
          }
        })}
      </ul>
      <ul className='channels'>
        <h2 className='users-header'>Channels:</h2>
        {groups.map(({ id, name }) => (
          <GroupItem key={id} id={id} name={name} />
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
