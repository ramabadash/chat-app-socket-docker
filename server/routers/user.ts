import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controller/users/usersLoginLogout';

router.post('/register', register); // Register

router.post('/login', login); // Login

router.post('/logout', logout); // Logout

export default router;
