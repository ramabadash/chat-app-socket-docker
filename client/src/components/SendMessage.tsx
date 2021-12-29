import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../server/@types/socket/types';

function SendMessage({
  room,
  username,
  socketRef,
}: {
  room: string;
  username: string;
  socketRef: React.MutableRefObject<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >;
}) {
  /***** STATE *****/
  const [message, setMessage] = useState<{
    name: string;
    message: string;
    to: string;
  }>({
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
    <div>
      <input
        placeholder='Enter your message here'
        onChange={e => {
          setMessage({
            name: username,
            message: e.target.value,
            to: room,
          });
        }}
      />
      <p> To {room}</p>
      <button onClick={e => onMessageSubmit(e)}>Send</button>
    </div>
  );
}

export default SendMessage;
