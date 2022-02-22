import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import axios from 'axios';
/***** ACTIONS *****/
import { userLogin } from '../../reducers/chatReducer';
/***** COMPONENTS *****/
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
/***** IO *****/
import { Socket } from 'socket.io-client';
/***** TYPES *****/
import './MenuAppBar.css';
/***** TYPES *****/
import { ServerToClientEvents, ClientToServerEvents } from '../../@types/socket/types';

interface Prop {
  socketRef?: React.MutableRefObject<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >;
  chatRef?: React.MutableRefObject<HTMLDivElement | null>;
  usersRef?: React.MutableRefObject<HTMLDivElement | null>;
}
/* ---------------------- COMPONENT ----------------------  */

function MenuAppBar({ socketRef, chatRef, usersRef }: Prop) {
  /***** STATE *****/
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);
  const [auth, setAuth] = React.useState(username ? true : false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showing, setShowing] = useState('chat');

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  const handleLogout = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    // Handle logout - Backend
    // Send logout event to server
    if (socketRef && socketRef.current) {
      socketRef.current.disconnect();
    }
    try {
      await axios('http://localhost:4000/users/logout', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
        data: { username },
        withCredentials: true, // send cookies
      });
    } catch (error) {
      console.log(error);
    }

    // Handle logout - Frontend
    setAuth(prevAuth => !prevAuth);
    dispatch(userLogin({ username: '' }));
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchClick = () => {
    setShowing(prevShowing => (prevShowing === 'chat' ? 'users' : 'chat'));
    if (chatRef && chatRef.current && usersRef && usersRef.current) {
      chatRef.current.classList.toggle('hide');
      usersRef.current.classList.toggle('hide');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <span className='material-icons'>forum</span>
            {'  '} Chattr.io
          </Typography>
          {auth && (
            <div>
              {/* User name */}
              <span className='hello-user'>Hello {username} !</span>
              {/* Switch screens */}
              <span className='chat-or-users' onClick={handleSwitchClick}>
                {showing === 'chat' ? (
                  <span>
                    <i className='fa-solid fa-comments'></i> chat
                  </span>
                ) : (
                  <span>
                    <i className='fa-solid fa-users'></i> users
                  </span>
                )}
              </span>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                style={{ top: '6vh' }}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={e => {
                    handleLogout(e);
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar;
