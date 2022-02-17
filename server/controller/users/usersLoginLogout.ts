// Packages
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// DB
import USERS from '../../db/users';
// Config
import config from '../../config/config';
// Types
import { NextFunction, Request, Response } from 'express';
import { User } from '../../@types/db/types';

/***** FUNCTIONS *****/
// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    // Find user
    const user = USERS.find((user: User) => user.name === username);
    if (!user) {
      throw { status: 400, message: 'Username is not found!' };
    }
    // Check password
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 400, message: 'Password is incorrect!' };
    }
    // ----- Create tokens -----

    // Access token
    const accessToken = jwt.sign({ name: user.name }, config.jwt.secret, {
      expiresIn: config.jwt.accessTime,
    });
    res.cookie('accessToken', accessToken, { expires: new Date(Date.now() + 1000 * 60 * 60) }); // Cookie expires in 1 hour

    // Refresh token
    const refreshToken = jwt.sign({ name: user.name }, config.jwt.secret, {});
    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }); // Cookie expires in 24 hours

    // Change user status
    user.status = 'online';

    res.send(username);
  } catch (error) {
    next(error);
  }
};

// When user register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      throw { status: 400, message: 'Please fill all fields' };
    }
    // Check if user name is available
    const user = USERS.find(user => user.name === username);
    if (user) {
      throw { status: 400, message: 'Username is taken! choose another one' };
    }

    // Hash password
    const hashedPassword = await bycrypt.hash(password, 10);

    // Create user and save to db
    const newUser = { name: username, id: '', password: hashedPassword, status: 'offline' } as User;
    USERS.push(newUser);

    res.status(201).json(newUser.name);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Logout
export const logout = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const user = USERS.find(user => user.name === username);
  if (!user) {
    throw { status: 400, message: 'Username is not found!' };
  }
  //Change user status to offline
  user.status = 'offline';

  // ----- Delete tokens -----
  // Remove cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.send('Logout successfully');
};
