import { Router } from 'express';

import { rootRoute } from '../controllers/api.js';
import resource from '../resource.js';

import User from '../models/user.js';
import Recipe from '../models/recipe.js';
import Box from '../models/box.js';
// import RecipeLike from '../models/recipeLike.js';

const apiRouter = Router();

apiRouter.get('/', rootRoute);

apiRouter.use(resource(User));
apiRouter.use(resource(Recipe));
apiRouter.use(resource(Box));

export default apiRouter;
