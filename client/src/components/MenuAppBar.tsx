import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
/***** ACTIONS *****/
import { userLogin } from '../reducers/chatReducer';
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
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../@types/socket/types';

interface SocketProp {
  socketRef?: React.MutableRefObject<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >;
}
/* ---------------------- COMPONENT ----------------------  */

function MenuAppBar({ socketRef }: SocketProp) {
  /***** STATE *****/
  const username = useAppSelector(({ chatReducer }) => chatReducer.username);
  const [auth, setAuth] = React.useState(username ? true : false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  /***** FUNCTIONS *****/
  const dispatch = useAppDispatch();

  const handleLogout = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAuth(prevAuth => !prevAuth);
    dispatch(userLogin({ username: '' }));
    if (socketRef && socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <span className='material-icons'>forum</span>
            {'  '} Chat
          </Typography>
          {auth && (
            <div>
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
