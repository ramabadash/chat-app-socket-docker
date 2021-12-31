import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
/***** REDUX *****/
import { useAppDispatch } from '../app/hooks';
/***** ACTIONS *****/
import { userLogin } from '../reducers/chatReducer';
/***** COMPONENTS *****/
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MenuAppBar from './MenuAppBar';
/***** STYLE *****/
import '../styles/Login.css';

/* ---------------------- COMPONENT ----------------------  */

function Login() {
  /***** STATE *****/
  const [username, setUsername] = useState('');

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const setUserName = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/users/${username}`
      );
      if (data === username) {
        dispatch(userLogin({ username }));
        navigate('/chat');
      }
    } catch (error) {
      console.log(error.response.data);
      setUsername('');
    }
  };

  return (
    <>
      <MenuAppBar />
      <div className='login-container'>
        <h1>Please login:</h1>

        <TextField
          id='input-with-icon-textfield'
          label='Enter user name here'
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' className='input-adornment'>
                <AccountCircle className='user-icon' />
              </InputAdornment>
            ),
          }}
          variant='standard'
        />
        <Button className='login-btn' variant='outlined' onClick={setUserName}>
          Login
        </Button>
      </div>
    </>
  );
}

export default Login;
