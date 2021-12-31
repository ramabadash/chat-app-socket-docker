import React, { useState } from 'react';
/***** IO *****/
import { Socket } from 'socket.io-client';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** STYLE *****/
import '../styles/SendMessage.css';
/***** TYPES *****/
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from '../../../server/@types/socket/types';

interface SendMessageProp {
  socketRef: React.MutableRefObject<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >;
}

/* ---------------------- COMPONENT ----------------------  */

function SendMessage({ socketRef }: SendMessageProp) {
  /***** STATE *****/
  const room = useAppSelector(({ chatReducer }) => chatReducer.room);

  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  const [message, setMessage] = useState<Message>({
    name: username,
    message: '',
    to: room,
  });

  const [stopTypingTimeout, setStopTypingTimeout] =
    useState<NodeJS.Timeout | null>(null);

  /***** FUNCTIONS *****/
  // Send message
  const onMessageSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    socketRef.current!.emit('message', message);
    setMessage({ message: '', name: username, to: room });

    // Stop typing
    setStopTypingTimeout(null);
    socketRef.current!.emit('userTyping', { name: username, type: false });
  };

  // On typing
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({
      name: username,
      message: e.target.value,
      to: room,
    });

    // cancel typing
    if (stopTypingTimeout) {
      setStopTypingTimeout(null);
    }
    // Send typing event
    socketRef.current!.emit('userTyping', { name: username, type: true });
    // cancel typing if no change for 3 seconds
    setStopTypingTimeout(
      setTimeout(() => {
        socketRef.current!.emit('userTyping', { name: username, type: false });
      }, 4000)
    );
  };

  return (
    <div className='send-message-container'>
      <textarea
        className='message-textarea'
        placeholder='Enter your message here'
        value={message.message}
        onChange={e => {
          handleTyping(e);
        }}
      />
      {/* <span> To {room ? room : 'All'}</span>
      {'  '} */}
      <button className='send-btn' onClick={e => onMessageSubmit(e)}>
        Send
      </button>
    </div>
  );
}

export default SendMessage;
