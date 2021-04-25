import { Router } from 'express';

import { rootRoute } from '../controllers/api.js';
import resource from '../resource.js';

import User from '../models/user.js';
import Recipe from '../models/recipe.js';
import Box from '../models/box.js';

import { login, userBoxes, userRecipes } from '../controllers/helper.js';
import { handleCastError, handleDuplicateError } from '../middleware.js';

const apiRouter = Router();

apiRouter.get('/', rootRoute);

const authConfig = {
  verifier: (token) => User.verifyToken(token), // can't just pass User.verifyToken due to this binding
  create: true,
  modify: true,
  replace: true,
  delete: true,
};

apiRouter.use(
  resource(Recipe, {
    ...authConfig,
    madeBy: async (user, resourceId) => {
      const recipe = await Recipe.findById(resourceId);
      return user._id.toString() === recipe.created.by.toString();
    },
  })
);
apiRouter.use(
  resource(Box, {
    ...authConfig,
    madeBy: async (user, resourceId) => {
      const box = await Box.findById(resourceId);
      return user._id.toString() === box.created.by.toString();
    },
  })
);
apiRouter.use(
  resource(User, {
    ...authConfig,
    create: false,
    madeBy: async (authUser, resourceId) =>
      authUser._id.toString() === resourceId,
  }),
  handleDuplicateError
);
apiRouter.post('/login', login);
apiRouter.get('/userBoxes/:userId', userBoxes);
apiRouter.get('/userRecipes/:userId', userRecipes);
apiRouter.use(handleCastError);

export default apiRouter;
