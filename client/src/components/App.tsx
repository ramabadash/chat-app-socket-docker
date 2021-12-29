import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../server/@types/socket/types';
import { User } from '../../../server/@types/db/types';

// Components
import UsersList from './UsersList';

function App() {
  /***** STATE *****/
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [username, setUsername] = useState(`user ${connectedUsers.length}`);
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
      <input
        onChange={e => setUsername(e.target.value)}
        placeholder='enter your name'
      />
      <UsersList users={connectedUsers} />
    </div>
  );
}

export default App;
