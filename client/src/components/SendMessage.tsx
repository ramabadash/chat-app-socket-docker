import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../app/hooks';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from '../../../server/@types/socket/types';

interface SendMessageProp {
  username: string;
  socketRef: React.MutableRefObject<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >;
}

function SendMessage({ username, socketRef }: SendMessageProp) {
  /***** STATE *****/
  const room = useAppSelector(({ chatReducer }) => chatReducer.room);

  const [message, setMessage] = useState<Message>({
    name: username,
    message: '',
    to: room,
  });

  /***** FUNCTIONS *****/
  const onMessageSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    socketRef.current!.emit('message', message);
    setMessage({ message: '', name: username, to: room });
  };

  return (
    <div className='send-message-container'>
      <input
        placeholder='Enter your message here'
        value={message.message}
        onChange={e => {
          setMessage({
            name: username,
            message: e.target.value,
            to: room,
          });
        }}
      />
      <span> To {room ? room : 'All'}</span>
      {'  '}
      <button onClick={e => onMessageSubmit(e)}>Send</button>
    </div>
  );
}

export default SendMessage;
