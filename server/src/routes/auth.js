import { Router } from 'express';
import {
  register,
  details,
  modify,
  remove,
  list,
  login,
  // logout,
  authenticateToken,
} from '../controllers/auth.js';

const authRouter = new Router();

authRouter.post('/register', register);
authRouter.get('/user/:id', details);
authRouter.get('/user', list);

authRouter.use('/user', authenticateToken); // require login to use following routes
authRouter.route('/user').patch(modify).delete(remove);

authRouter.post('/login', login);
// authRouter.post('/logout', logout);

export default authRouter;
