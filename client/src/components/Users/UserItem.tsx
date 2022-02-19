import React, { useEffect, useState } from 'react';
/***** REDUX *****/
import { useAppDispatch, useAppSelector } from '../../app/hooks';
/***** ACTIONS *****/
import {
  setMessageDestination,
  showConversation,
  clearUnreadMessagesByName,
} from '../../reducers/chatReducer';
/***** TYPES *****/
interface Props {
  id: string;
  name: string;
  status: 'online' | 'offline';
}

/* ---------------------- COMPONENT ----------------------  */

function UserItem({ id, name, status }: Props) {
  /***** STATE *****/
  const currentRoom = useAppSelector(({ chatReducer }) => chatReducer.room);
  const unreadMessages = useAppSelector(({ chatReducer }) => chatReducer.unreadMessages);
  // This users amount of unread messages
  const [myUnreadMessages, setMyUnreadMessages] = useState<{ username: string; amount: number }>({
    username: name,
    amount: 0,
  });

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();
  // Handle click on user item
  const handleUserClick = () => {
    dispatch(setMessageDestination({ name }));
    dispatch(showConversation());
    dispatch(clearUnreadMessagesByName({ name }));
  };

  /***** EFFECT *****/
  useEffect(() => {
    setMyUnreadMessages(
      unreadMessages[name]
        ? { username: name, amount: unreadMessages[name] }
        : { username: name, amount: 0 }
    );
  }, [unreadMessages]);

  return (
    <li key={id} className={`${currentRoom === name ? 'active' : ''}`} onClick={handleUserClick}>
      <img src='https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' alt='user' />
      <div>
        <h2>{name}</h2>
        <h3>
          <span className={`status ${status === 'online' ? 'green' : 'red'}`}></span>
          {status === 'online' ? 'online' : 'offline'}
        </h3>
      </div>
      <span className='unread-number'>
        {myUnreadMessages.amount === 0 ? '' : myUnreadMessages.amount}
      </span>
    </li>
  );
}

export default UserItem;
