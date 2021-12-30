import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
/***** IO *****/
import { io, Socket } from 'socket.io-client';
/***** TYPES *****/
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../server/@types/socket/types';
/***** COMPONENTS *****/
import UsersList from './UsersList';
import SendMessage from './SendMessage';
import Chat from './Chat';
/***** ACTIONS *****/
import { updateUsers, getMessage } from '../reducers/chatReducer';
/***** STYLES *****/
import '../styles/App.css';

/* ---------------------------------------- */

function App() {
  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  /***** STATE *****/
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

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
        <SendMessage socketRef={socketRef} />
      </div>
    </>
  );
}

export default App;
