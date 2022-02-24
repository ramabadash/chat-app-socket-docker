import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
/***** REDUX *****/
import { useAppDispatch } from '../../app/hooks';
/***** ACTIONS *****/
import { userLogin } from '../../reducers/chatReducer';
/***** COMPONENTS *****/
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MenuAppBar from '../NavBar/MenuAppBar';
/***** STYLE *****/
import './Login.css';
/***** POP-UP MESSAGES *****/
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

/* ---------------------- COMPONENT ----------------------  */

function Login() {
  /***** STATE *****/
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const login = async () => {
    try {
      if (!username || !password) {
        return notyf.error(`You must fill all fields. Please try again`); //error message
      }

      const { data } = await axios('http://localhost:4000/users/login', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
        data: { username, password },
        withCredentials: true, // send cookies
      });

      if (data === username) {
        dispatch(userLogin({ username }));
        navigate('/chat');
      }
    } catch (error) {
      notyf.error(error.response.data); //error message
      setUsername('');
      setPassword('');
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

        <TextField
          id='input-with-icon-textfield-password'
          label='Enter password here'
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          type='password'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' className='input-adornment'>
                <i className='fa-solid fa-unlock-keyhole password-icon'></i>
              </InputAdornment>
            ),
            autoComplete: 'new-password',
          }}
          variant='standard'
        />

        <Button className='login-btn' variant='outlined' onClick={login}>
          Login
        </Button>

        <Button
          className='to-register-btn'
          variant='outlined'
          onClick={() => navigate('/register')}
        >
          Not a member? Register here instead
        </Button>
      </div>
    </>
  );
}

export default Login;
