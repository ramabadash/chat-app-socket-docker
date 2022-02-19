import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** TYPES *****/
interface Props {
  name: string;
  message: string;
}

/* ---------------------- COMPONENT ----------------------  */

function ChatUserActivity({ name, message }: Props) {
  /***** STATE *****/
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  return (
    <li>
      <div className='entete user-activity'>
        <span className={'status blue'}></span>
        {'  '}
        <h2>{name === username ? 'You' : name}</h2> <h3>{message}</h3>
      </div>
    </li>
  );
}

export default ChatUserActivity;
