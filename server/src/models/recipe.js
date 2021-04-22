import mongoose from 'mongoose';

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
  readyIn: Number, // minutes
  servings: Number, // portion count
  directions: [
    {
      step: String,
      details: String,
    },
  ],
  created: {
    by: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    on: {
      // originally created date
      type: Date,
      default: Date.now,
    },
    // edit: Date, // last time edited if applicable
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
