// Packages
import bycrypt from 'bcrypt';
// DB
import USERS from '../../db/users';
// Types
import { NextFunction, Request, Response } from 'express';
import { User } from '../../@types/db/types';

/***** FUNCTIONS *****/
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
    const newUser = { name: username, id: '', password: hashedPassword } as User;
    USERS.push(newUser);

    res.status(201).json(newUser.name);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
