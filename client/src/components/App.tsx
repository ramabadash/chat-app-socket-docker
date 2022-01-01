import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import MenuAppBar from './MenuAppBar';
import MessageDestination from './MessageDestination';
/***** ACTIONS *****/
import {
  updateUsers,
  getMessage,
  setTypingUser,
} from '../reducers/chatReducer';
/***** STYLES *****/
import '../styles/App.css';

/* ---------------------- COMPONENT ----------------------  */

function App() {
  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  /***** STATE *****/
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  /***** REFS *****/
  let socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  /***** EFFECT *****/

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      socketRef.current = io(`http://localhost:4000/`, {
        auth: { username },
      });

      socketRef.current.on('replay', ({ name, message, timeStamp, to }) => {
        dispatch(getMessage({ message: { name, message, timeStamp, to } }));
      });

      socketRef.current.on('userActivity', users => {
        dispatch(updateUsers({ users })); // Update online users list on the state
      });

      socketRef.current.on('userTypingReplay', ({ name, type }) => {
        dispatch(setTypingUser({ name, type }));
      });
    }
  }, []);

  return (
    <>
      <MenuAppBar socketRef={socketRef} />
      <div className='App'>
        <MessageDestination />
        <Chat />
        <UsersList />
        <SendMessage socketRef={socketRef} />
      </div>
    </>
  );
}

export default App;
