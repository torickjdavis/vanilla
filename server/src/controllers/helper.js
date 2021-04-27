import status from 'http-status';
import User from '../models/user.js';
import Recipe from '../models/recipe.js';
import Box from '../models/box.js';

export async function login(req, res) {
  try {
    const validPassword = await User.verifyPassword(
      req.body.email,
      req.body.password
    );

    if (!validPassword) return res.sendStatus(status.FORBIDDEN);

    const user = await User.findOne({ email: req.body.email }).exec();
    const accessToken = await user.generateToken();

    res.json({ accessToken, user }); // user details in signed token
  } catch (error) {
    console.error(error);
    return res
      .status(status.NOT_FOUND)
      .json({ message: `No ${User.modelName} Found` });
  }
}

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
