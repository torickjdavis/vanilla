import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    first: String,
    last: String,
    // TODO add virtual for "full" name
  },
  picture: String, // potentially added sizes
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('user', UserSchema);
