import { Router } from 'express';

import { rootRoute } from '../controllers/api.js';
import resource from '../resource.js';

import authRouter from '../routes/auth.js';
import Recipe from '../models/recipe.js';
import Box from '../models/box.js';

const apiRouter = Router();

apiRouter.get('/', rootRoute);

apiRouter.use('/auth', authRouter);
apiRouter.use(resource(Recipe));
apiRouter.use(resource(Box));

export default apiRouter;
