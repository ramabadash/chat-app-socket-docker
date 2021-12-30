import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/***** REDUX *****/
import { useAppDispatch } from '../app/hooks';
/***** ACTIONS *****/
import { userLogin } from '../reducers/chatReducer';

/* ---------------------- COMPONENT ----------------------  */

function Login() {
  /***** STATE *****/
  const [username, setUsername] = useState('');

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const setUserName = () => {
    dispatch(userLogin({ username }));
    navigate('/chat');
  };

  return (
    <div>
      <h1>Welcome to the chat:</h1>
      <input
        value={username}
        placeholder='Enter your user name'
        onChange={e => {
          setUsername(e.target.value);
        }}
      />
      <button onClick={setUserName}>Login</button>
    </div>
  );
}

export default Login;
