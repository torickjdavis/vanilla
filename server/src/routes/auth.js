import { Router } from 'express';
import {
  register,
  modify,
  remove,
  login,
  // logout,
  authenticateToken,
} from '../controllers/auth.js';

const authRouter = new Router();

authRouter.post('/register', register);

authRouter.use('/user', authenticateToken); // require login to use
authRouter.route('/user').patch(modify).delete(remove);

authRouter.post('/login', login);
// authRouter.post('/logout', logout);

export default authRouter;
