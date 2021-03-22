import mongoose from 'mongoose';

import User from './user.js';

const ObjectId = mongoose.Types.ObjectId;

export const RecipeSchema = new mongoose.Schema({
  // private: {
  //   type: Boolean,
  //   default: true,
  // },
  title: {
    type: String,
    required: true,
  },
  image: String,
  summary: String,
  time: {
    prep: Date, // duration
    cook: Date, // duration
  },
  serves: Number, // portion count
  directions: [
    {
      step: String,
      details: String,
    },
  ],
  created: {
    by: {
      type: ObjectId,
      ref: User,
      required: true,
    },
    on: {
      // originally created date
      type: Date,
      default: Date.now,
    },
    edit: Date, // last time edited if applicable
  },
  ingredients: [
    {
      name: String,
      quantity: Number,
      unit: String,
    },
  ],
});

export default mongoose.model('recipe', RecipeSchema);
