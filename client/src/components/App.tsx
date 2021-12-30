import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
// io
import { io, Socket } from 'socket.io-client';
// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from '../../../server/@types/socket/types';
import { User } from '../../../server/@types/db/types';
// Components
import UsersList from './UsersList';
import SendMessage from './SendMessage';
// Actions
import { updateUsers } from '../reducers/chatReducer';

function App() {
  /***** STATE *****/
  const dispatch = useAppDispatch();

  /***** STATE *****/
  const connectedUsers = useAppSelector(
    ({ chatReducer }) => chatReducer.connectedUsers
  );

  const [username, setUsername] = useState(`user ${connectedUsers.length}`);
  const [room, setRoom] = useState('');
  const [chat, setChat] = useState<Message[]>([]);
  console.log({ connectedUsers });

  /***** REFS *****/
  let socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  /***** EFFECT *****/
  useEffect(() => {
    socketRef.current = io(`http://localhost:4000/`, {
      auth: { username },
    });

    socketRef.current.on('replay', ({ name, message }) => {
      setChat(prevMessages => [...prevMessages, { name, message }]);
    });

    socketRef.current.on('userActivity', users => {
      dispatch(updateUsers({ users })); // Update online users list on the state
    });
  }, []);

  return (
    <div className='App'>
      <h1>Chat app </h1>

      <div className='chat'>
        <h3>CHAT</h3>
        <ul className='chat-list'>
          {chat.map(({ name, message }) => (
            <li>{`${name}: ${message}`}</li>
          ))}
        </ul>
      </div>
      <UsersList users={connectedUsers} setRoom={setRoom} />
      <SendMessage room={room} username={username} socketRef={socketRef} />
    </div>
  );
}

export default App;
