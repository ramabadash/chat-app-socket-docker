import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';

/* ---------------------- COMPONENT ----------------------  */

function MessageDestination() {
  /***** STATE *****/
  const currentRoom = useAppSelector(({ chatReducer }) => chatReducer.room.name);

  const typingUser = useAppSelector(({ chatReducer }) => chatReducer.typingUser);

  return (
    <div className='destination'>
      {currentRoom ? (
        <span>
          <i className='fa-solid fa-user'></i> currentRoom
        </span>
      ) : (
        <span>
          <i className='fa-solid fa-user-group'></i> Group chat
        </span>
      )}
      {typingUser ? <p className='typing-p'>{typingUser} is typing ... 💬</p> : ''}
    </div>
  );
}

export default MessageDestination;
