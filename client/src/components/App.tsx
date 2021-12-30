import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
// io
import { io, Socket } from 'socket.io-client';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../server/@types/socket/types';
// Components
import UsersList from './UsersList';
import SendMessage from './SendMessage';
import Chat from './Chat';
// Actions
import { updateUsers, getMessage } from '../reducers/chatReducer';
// Style
import '../styles/App.css';

function App() {
  /***** STATE *****/
  const dispatch = useAppDispatch();

  /***** STATE *****/
  const connectedUsers = useAppSelector(
    ({ chatReducer }) => chatReducer.connectedUsers
  );
  const [username, setUsername] = useState(`user ${connectedUsers.length}`);

  /***** REFS *****/
  let socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  /***** EFFECT *****/
  useEffect(() => {
    socketRef.current = io(`http://localhost:4000/`, {
      auth: { username },
    });

    socketRef.current.on('replay', ({ name, message }) => {
      dispatch(getMessage({ message: { name, message } }));
    });

    socketRef.current.on('userActivity', users => {
      dispatch(updateUsers({ users })); // Update online users list on the state
    });
  }, []);

  return (
    <>
      <h1>Chat app </h1>
      <div className='App'>
        <Chat />
        <UsersList />
        <SendMessage username={username} socketRef={socketRef} />
      </div>
    </>
  );
}

export default App;
