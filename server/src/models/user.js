import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Box from './box.js';
import Recipe from './recipe.js';

const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    first: String,
    last: String,
  },
  picture: String, // potentially added sizes
});

UserSchema.virtual('name.full').get(function () {
  return [this.name.first || null, this.name.last || null]
    .filter((v) => !!v)
    .join(' ');
});

UserSchema.pre('validate', async function () {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }
});

UserSchema.statics.verifyPassword = async function (email, plainTextPassword) {
  const user = await this.findOne({ email }).select('+password').exec();
  if (!user) throw new Error('Not Found');
  return await bcrypt.compare(plainTextPassword, user.password);
};

UserSchema.methods.generateToken = async function () {
  return jwt.sign(this.toJSON(), JWT_SECRET, {
    expiresIn: '1d',
  });
};

UserSchema.static('verifyToken', async function (token) {
  const User = this;
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, user) => {
      if (error) reject(error);
      resolve(User.hydrate(user));
    });
  });
});

UserSchema.post('remove', async function () {
  const userId = this._id;
  await Box.deleteMany({ 'created.by': { $in: [userId] } }).exec();
  await Recipe.deleteMany({ 'created.by': { $in: [userId] } }).exec();
});

export default mongoose.model('user', UserSchema);
