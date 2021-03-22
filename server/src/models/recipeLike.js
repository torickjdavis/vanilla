import mongoose from 'mongoose';

import User from './user.js';
import Recipe from './recipe.js';

const ObjectId = mongoose.Types.ObjectId;

export const RecipeLike = new mongoose.Schema({
  recipe: {
    type: ObjectId,
    ref: Recipe,
  },
  likedBy: {
    type: ObjectId,
    ref: User,
    required: true,
  },
});

export default mongoose.model('recipeLike', RecipeLike);
