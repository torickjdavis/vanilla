import mongoose from 'mongoose';

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

export default mongoose.model('user', UserSchema);
