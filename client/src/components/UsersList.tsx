import React from 'react';
/***** REDUX *****/
import { useAppDispatch, useAppSelector } from '../app/hooks';
/***** ACTIONS *****/
import { setMessageDestination } from '../reducers/chatReducer';
/***** STYLE *****/
import '../styles/UsersList.css';

/* ---------------------- COMPONENT ----------------------  */

function UsersList() {
  /***** STATE *****/
  const connectedUsers = useAppSelector(
    ({ chatReducer }) => chatReducer.connectedUsers
  );

  const username = useAppSelector(({ chatReducer }) => chatReducer.username);

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  return (
    <div className='users-list-container'>
      <ul>
        {connectedUsers.map(({ id, name }) => (
          <li
            key={id}
            onClick={() => {
              dispatch(setMessageDestination({ room: id }));
            }}
          >
            <img
              src='https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
              alt='user'
            />
            <div>
              <h2>{username === name ? '(You)' : name}</h2>
              <h3>
                <span className='status green'></span>
                online
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
