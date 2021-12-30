import React from 'react';
import { nanoid } from 'nanoid';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** STYLE *****/
import '../styles/Chat.css';

/* ---------------------- COMPONENT ----------------------  */

function Chat() {
  /***** STATE *****/
  const chat = useAppSelector(({ chatReducer }) => chatReducer.chat);
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  return (
    <div className='chat'>
      <ul className='chat-list'>
        {chat.map(({ name, message, timeStamp }) => (
          <li key={nanoid()} className={`${username === name ? 'me' : 'you'}`}>
            <div className='entete'>
              <span className={'status green'}></span>
              <h2>{name}</h2> <h3>{timeStamp}</h3>
            </div>
            <div className='message'>{message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
