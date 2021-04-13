import status from 'http-status';
import User from '../models/user.js';
import Recipe from '../models/recipe.js';
import Box from '../models/box.js';

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

export async function userBoxes(req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: `No User Found (${userId})` });
    }

    const boxes = await Box.find({ 'created.by': userId }).exec();
    res.json({ user, boxes });
  } catch (error) {
    next(error);
  }
}
