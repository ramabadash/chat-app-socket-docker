import React from 'react';
/***** REDUX *****/
import { useAppDispatch, useAppSelector } from '../../app/hooks';
/***** ACTIONS *****/
import { setMessageDestination, showConversation } from '../../reducers/chatReducer';
/***** POP-UP MESSAGES *****/
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();
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

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();
  // Handle click on user item
  const handleUserClick = () => {
    dispatch(setMessageDestination({ name }));
    dispatch(showConversation());
  };

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
    </li>
  );
}

export default UserItem;
