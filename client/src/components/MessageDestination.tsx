import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** COMPONENTS *****/
import AccountCircle from '@mui/icons-material/AccountCircle';

/* ---------------------- COMPONENT ----------------------  */

function MessageDestination() {
  /***** STATE *****/
  const currentRoom = useAppSelector(
    ({ chatReducer }) => chatReducer.room.name
  );

  const typingUser = useAppSelector(
    ({ chatReducer }) => chatReducer.typingUser
  );

  return (
    <div className='destination'>
      <AccountCircle />
      <span> To ➡ {currentRoom ? currentRoom : 'Group chat'} </span>
      {typingUser ? (
        <p className='typing-p'>{typingUser} is typing ... 💬</p>
      ) : (
        ''
      )}
    </div>
  );
}

export default MessageDestination;
