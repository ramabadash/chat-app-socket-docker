import React, { useState } from 'react';
/***** IO *****/
import { Socket } from 'socket.io-client';
/***** REDUX *****/
import { useAppSelector } from '../../app/hooks';
/***** STYLE *****/
import './SendMessage.css';
/***** POP-UP MESSAGES *****/
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
/***** TYPES *****/
import { ServerToClientEvents, ClientToServerEvents, Message } from '../../@types/socket/types';

interface SendMessageProp {
  socketRef: React.MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents> | undefined>;
}
const notyf = new Notyf();

/* ---------------------- COMPONENT ----------------------  */

function SendMessage({ socketRef }: SendMessageProp) {
  /***** STATE *****/
  const room = useAppSelector(({ chatReducer }) => chatReducer.room.room);

  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  const [message, setMessage] = useState<Message>({
    name: username,
    message: '',
    to: room,
  });

  const [stopTypingTimeout, setStopTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  /***** FUNCTIONS *****/
  // Send message
  const onMessageSubmit = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (message.message) {
      socketRef.current!.emit('message', message);
      setMessage({ message: '', name: username, to: room });

      // Stop typing
      setStopTypingTimeout(null);
      socketRef.current!.emit('userTyping', { name: username, type: false });
    } else {
      notyf.error(`Can't send empty messages`); //error message
    }
  };

  // On typing
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({
      name: username,
      message: e.target.value,
      to: room,
    });

    // cancel typing
    if (stopTypingTimeout) {
      setStopTypingTimeout(null);
    }
    // Send typing event
    socketRef.current!.emit('userTyping', { name: username, type: true });
    // cancel typing if no change for 3 seconds
    setStopTypingTimeout(
      setTimeout(() => {
        socketRef.current!.emit('userTyping', { name: username, type: false });
      }, 4000)
    );
  };

  return (
    <div className='send-message-container'>
      <textarea
        className='message-textarea'
        placeholder='Enter your message here'
        value={message.message}
        onChange={handleTyping}
        onKeyPress={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            onMessageSubmit(e);
          }
        }}
      />
      <span id='send-btn' className='material-icons' onClick={e => onMessageSubmit(e)}>
        send
      </span>
    </div>
  );
}

export default SendMessage;
