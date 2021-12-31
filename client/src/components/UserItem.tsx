import React from 'react';
/***** REDUX *****/
import { useAppDispatch, useAppSelector } from '../app/hooks';
/***** ACTIONS *****/
import { setMessageDestination } from '../reducers/chatReducer';

/* ---------------------- COMPONENT ----------------------  */

function UserItem({ id, name }: { id: string; name: string }) {
  /***** STATE *****/
  const currentRoom = useAppSelector(({ chatReducer }) => chatReducer.room);

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  return (
    <li
      key={id}
      className={`${currentRoom === id ? 'active' : ''}`}
      onClick={() => {
        dispatch(setMessageDestination({ room: id }));
      }}
    >
      <img
        src='https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
        alt='user'
      />
      <div>
        <h2>{name}</h2>
        <h3>
          <span className='status green'></span>
          online
        </h3>
      </div>
    </li>
  );
}

export default UserItem;
