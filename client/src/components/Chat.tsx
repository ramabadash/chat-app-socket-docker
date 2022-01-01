import React, { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** COMPONENTS *****/
import ChatUserMessage from './ChatUserMessage';
import ChatUserActivity from './ChatUserActivity';
/***** STYLE *****/
import '../styles/Chat.css';

/* ---------------------- COMPONENT ----------------------  */

function Chat() {
  /***** REFS *****/
  const messageEl = useRef<HTMLDivElement | null>(null);

  /***** STATE *****/
  const chat = useAppSelector(({ chatReducer }) => chatReducer.chat);

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
          // Message from a user
          if (timeStamp) {
            return (
              <ChatUserMessage
                key={nanoid()}
                name={name}
                message={message}
                timeStamp={timeStamp}
                to={to}
              />
            );
          } else {
            return (
              <ChatUserActivity key={nanoid()} name={name} message={message} />
            ); // User enter or left the chat message
          }
        })}
      </ul>
      {typingUser ? <p className='typing-p'>{typingUser} is typing ...</p> : ''}
    </div>
  );
}

export default Chat;
