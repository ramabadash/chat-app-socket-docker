import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
/***** IO *****/
import { io, Socket } from 'socket.io-client';
/***** TYPES *****/
import { ServerToClientEvents, ClientToServerEvents, Message } from '../@types/socket/types';
/***** COMPONENTS *****/
import UsersList from './Users/UsersList';
import SendMessage from './SendMessages/SendMessage';
import Chat from './Chat/Chat';
import MenuAppBar from './MenuAppBar';
/***** ACTIONS *****/
import {
  updateUsers,
  getMessage,
  setTypingUser,
  showConversation,
  updateMessagesHistory,
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

      socketRef.current.on('updateMessagesHistory', (messages: Message[]) => {
        dispatch(updateMessagesHistory({ messages }));
        dispatch(showConversation()); // Show the conversation in the group chat
      });

      socketRef.current.on('userActivity', users => {
        dispatch(updateUsers({ users })); // Update online users list on the state
      });

      socketRef.current.on('userTypingReplay', ({ name, type }) => {
        dispatch(setTypingUser({ name, type }));
      });

      return () => {
        socketRef.current?.emit('disconnect');
        socketRef.current?.close();
      };
    }
  }, []);

  return (
    <>
      <MenuAppBar socketRef={socketRef} />
      <div className='App'>
        <UsersList />
        <div className='chat-area'>
          <Chat />
          <SendMessage socketRef={socketRef} />
        </div>
      </div>
    </>
  );
}

export default App;
