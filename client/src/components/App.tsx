import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../server/@types/socket/types';

import { User } from '../../../server/@types/db/types';

function App() {
  /***** STATE *****/
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('rama');
  console.log({ connectedUsers });

  /***** REFS *****/
  let socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  /***** EFFECT *****/
  useEffect(() => {
    socketRef.current = io(`http://localhost:4000/`, {
      auth: { username },
    });

    socketRef.current.on('replay', ({ name, message }) => {
      console.log({ name, message });
    });

    socketRef.current.on('userActivity', users => {
      setConnectedUsers(users);
      // setConnectedUsers(users.map(({ name }: { name: string }) => name)); // Update users list
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
