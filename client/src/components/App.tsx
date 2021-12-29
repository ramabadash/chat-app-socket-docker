import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../@types/socket/types';

function App() {
  const username = 'Rama';

  /***** REFS *****/
  let socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  /***** EFFECT *****/
  useEffect(() => {
    socketRef.current = io(`http://localhost:4000/?name=${username}`);
    socketRef.current.on('replay', ({ name, message }) => {
      console.log({ name, message });
    });
  }, []);

  return (
    <div className='App'>
      <h1>Chat app </h1>
    </div>
  );
}

export default App;
