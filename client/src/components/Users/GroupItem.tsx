import React, { useState, useEffect } from 'react';
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
}

function GroupItem({ id, name }: Props) {
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
  const handleGroupClick = () => {
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
    <li key={id} className={`${currentRoom === name ? 'active' : ''}`} onClick={handleGroupClick}>
      <img src='https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' alt='user' />
      <div>
        <h2>{name}</h2>
      </div>
      <span className='unread-number'>
        {myUnreadMessages.amount === 0 ? '' : myUnreadMessages.amount}
      </span>
    </li>
  );
}

export default GroupItem;
