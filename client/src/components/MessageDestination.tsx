import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';

/* ---------------------- COMPONENT ----------------------  */

function MessageDestination() {
  /***** STATE *****/
  const currentRoom = useAppSelector(({ chatReducer }) => chatReducer.room);

  const typingUser = useAppSelector(({ chatReducer }) => chatReducer.typingUser);

  return (
    <div className='destination'>
      {currentRoom === 'Group' ? (
        <span>
          <i className='fa-solid fa-user-group'></i> Group chat
        </span>
      ) : (
        <span>
          <i className='fa-solid fa-user'></i> {currentRoom}
        </span>
      )}
      {typingUser ? <p className='typing-p'>{typingUser} is typing ... 💬</p> : ''}
    </div>
  );
}

export default MessageDestination;
