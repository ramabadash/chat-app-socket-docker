import express from 'express';
const router = express.Router();
import USERS from '../db/users';

// Check ig username is available
router.post('/:username', (req, res) => {
  const { username } = req.params;
  for (const user of USERS) {
    if (user.name === username) {
      throw { status: 400, message: 'Username is taken! choose another one' };
    }
  }
  res.send(username);
});

export default router;
