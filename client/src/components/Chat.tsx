import React, { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** STYLE *****/
import '../styles/Chat.css';

/* ---------------------- COMPONENT ----------------------  */

function Chat() {
  /***** REFS *****/
  const messageEl = useRef<HTMLDivElement | null>(null);

  /***** STATE *****/
  const chat = useAppSelector(({ chatReducer }) => chatReducer.chat);
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);
  const typingUser = useAppSelector(
    ({ chatReducer }) => chatReducer.typingUser
  );

  /***** EFFECT *****/
  //Scroll down the massages list on new massages
  useEffect(() => {
    if (messageEl.current !== null) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        messageEl.current!.scroll({
          top: messageEl.current!.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, []);

  return (
    <div className='chat' ref={messageEl}>
      <ul className='chat-list'>
        {chat.map(({ name, message, timeStamp, to }) => {
          console.log(to);

          // Message from a user
          if (timeStamp) {
            return (
              <li
                key={nanoid()}
                className={`${username === name ? 'me' : 'you'}`}
              >
                <div className='entete'>
                  <span className={'status green'}></span>
                  <h2>{name}</h2>{' '}
                  <h3>{to ? `[To ${to} - Private Message ]` : '[ To All ]'}</h3>{' '}
                  <h2>{timeStamp}</h2>
                </div>
                <div className='message'>{message}</div>
              </li>
            );
          } else {
            // User enter or left the chat message
            return (
              <li key={nanoid()}>
                <div className='entete user-activity'>
                  <span className={'status blue'}></span>
                  {'  '}
                  <h2>{name}</h2> <h3>{message}</h3>
                </div>
              </li>
            );
          }
        })}
      </ul>
      {typingUser ? <p className='typing-p'>{typingUser} is typing ...</p> : ''}
    </div>
  );
}

export default Chat;
