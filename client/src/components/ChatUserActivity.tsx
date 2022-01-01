import React from 'react';

/* ---------------------- COMPONENT ----------------------  */

function ChatUserActivity({
  name,
  message,
}: {
  name: string;
  message: string;
}) {
  return (
    <li>
      <div className='entete user-activity'>
        <span className={'status blue'}></span>
        {'  '}
        <h2>{name}</h2> <h3>{message}</h3>
      </div>
    </li>
  );
}

export default ChatUserActivity;
