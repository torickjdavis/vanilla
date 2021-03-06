import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const BoxSchema = new mongoose.Schema({
  // private: {
  //   type: Boolean,
  //   default: true,
  // },
  name: {
    type: String,
    required: true,
  },
  description: String,
  recipes: [
    {
      type: ObjectId,
      ref: 'recipe',
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
});

export default mongoose.model('box', BoxSchema);
