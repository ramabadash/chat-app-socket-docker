import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** TYPES *****/
interface ChatUserMessageProp {
  name: string;
  message: string;
  timeStamp: string;
  to: string | undefined;
}

/* ---------------------- COMPONENT ----------------------  */

function ChatUserMessage({ name, message, timeStamp, to }: ChatUserMessageProp) {
  /***** STATE *****/
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  return (
    <li className={`${username === name ? 'me' : 'you'}`}>
      <div className='entete'>
        <span className={'status green'}></span>
        <h2>{name === username ? 'You' : name}</h2>{' '}
        <h3>{to ? `[To ${to} - Private Message ]` : '[ To All ]'}</h3> <h2>{timeStamp}</h2>
      </div>
      <div className='message'>{message}</div>
    </li>
  );
}

export default ChatUserMessage;
