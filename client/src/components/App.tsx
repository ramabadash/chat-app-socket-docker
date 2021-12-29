import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../server/@types/socket/types';

function App() {
  /***** STATE *****/
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [username, setUsername] = useState();
  console.log({ connectedUsers });

  /***** REFS *****/
  let socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  /***** EFFECT *****/
  useEffect(() => {
    socketRef.current = io(`http://localhost:4000/?name=${username}`);

    socketRef.current.on('replay', ({ name, message }) => {
      console.log({ name, message });
    });

    socketRef.current.on('userActivity', users => {
      setConnectedUsers(users.map(({ id }: { id: string }) => id)); // Update users list
      return;
    });
  }, []);

  return (
    <div className='App'>
      <h1>Chat app </h1>
    </div>
  );
}

export default App;
