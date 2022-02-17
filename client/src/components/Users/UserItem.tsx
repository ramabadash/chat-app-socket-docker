import React from 'react';
/***** REDUX *****/
import { useAppDispatch, useAppSelector } from '../../app/hooks';
/***** ACTIONS *****/
import { setMessageDestination } from '../../reducers/chatReducer';
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
  const currentRoom = useAppSelector(({ chatReducer }) => chatReducer.room.room);

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();
  // Handle click on user item
  const handleUserClick = () => {
    if (status === 'online') {
      dispatch(setMessageDestination({ room: id, name }));
    } else {
      notyf.error('Sorry cannot send message to offline users, maybe later...'); //error message
    }
  };

  return (
    <li key={id} className={`${currentRoom === id ? 'active' : ''}`} onClick={handleUserClick}>
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
