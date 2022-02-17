import express from 'express';
const router = express.Router();
import { register, login } from '../controller/users/usersLoginLogout';

router.post('/register', register); // Register

router.post('/login', login); // Login

export default router;
