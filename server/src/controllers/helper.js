import status from 'http-status';
import User from '../models/user.js';
import Recipe from '../models/recipe.js';

export async function userRecipes(req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: `No User Found (${userId})` });
    }

    const recipes = await Recipe.find({ 'created.by': userId }).exec();
    res.json({ user, recipes });
  } catch (error) {
    next(error);
  }
}
