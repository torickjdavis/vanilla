import mongoose from 'mongoose';
import Box from './box.js';
import Recipe from './recipe.js';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    first: String,
    last: String,
    // TODO add virtual for "full" name
  },
  picture: String, // potentially added sizes
});

UserSchema.post('remove', async function () {
  const userId = this._id;
  await Box.deleteMany({ 'created.by': { $in: [userId] } }).exec();
  await Recipe.deleteMany({ 'created.by': { $in: [userId] } }).exec();
});

export default mongoose.model('user', UserSchema);
