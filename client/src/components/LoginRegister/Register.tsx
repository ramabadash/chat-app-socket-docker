import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

function Register() {
  /***** STATE *****/
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /***** FUNCTIONS *****/
  // Navigate
  const navigate = useNavigate();
  // Register as a new user
  const register = async () => {
    try {
      if (!username || !password) {
        return notyf.error(`You must fill all fields. Please try again`); //error message
      }
      const { data } = await axios.post(`http://localhost:4000/users/register`, {
        username,
        password,
      });
      if (data === username) {
        notyf.success(`You have successfully registered!`); //success message
        navigate('/');
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
        <h1>Please register:</h1>

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

        <Button className='login-btn' variant='outlined' onClick={register}>
          <i className='fa-solid fa-user-plus'></i>
          {'  '}Submit
        </Button>

        <Button className='to-login-btn' variant='outlined' onClick={() => navigate('/')}>
          You already has an account?
        </Button>
      </div>
    </>
  );
}

export default Register;
