import React from 'react';

/***** REDUX *****/
import { useAppSelector } from '../app/hooks';

/* ---------------------- COMPONENT ----------------------  */

function Chat() {
  /***** STATE *****/
  const chat = useAppSelector(({ chatReducer }) => chatReducer.chat);

  return (
    <div className='chat'>
      <h3>CHAT</h3>
      <ul className='chat-list'>
        {chat.map(({ name, message }) => (
          <li>{`${name}: ${message}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
