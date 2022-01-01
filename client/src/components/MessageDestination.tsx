import React from 'react';
/***** REDUX *****/
import { useAppSelector } from '../app/hooks';
/***** COMPONENTS *****/
import AccountCircle from '@mui/icons-material/AccountCircle';

/* ---------------------- COMPONENT ----------------------  */

function MessageDestination() {
  /***** STATE *****/
  const currentRoom = useAppSelector(
    ({ chatReducer }) => chatReducer.room.name
  );

  return (
    <div className='destination'>
      <AccountCircle />
      <span> To ➡ {currentRoom ? currentRoom : 'Group chat'} </span>
    </div>
  );
}

export default MessageDestination;
