import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import status from 'http-status';

const SALT_ROUNDS = 10;

// create
export async function register(req, res, next) {
  // use body and let schema validation handle keys
  try {
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS); // reassign with hash
    const user = new User(req.body);
    await user.save();
    res.status(status.CREATED).json(user);
  } catch (error) {
    next(error);
  }
}

// read
// export async function details(req, res, next) {
//   try {
//     const user = await User.findById(id).exec();
//     if (user) res.json(user);
//   } catch (error) {
//     next(error);
//   }
// }

// update (modify)
export async function modify(req, res, next) {
  try {
    const id = req.user._id;
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS); // re-encrypt password
    }
    await User.findByIdAndUpdate(id, req.body).exec();
    res.json({
      success: true,
      message: `Modified ${User.modelName} Instance (${id})`,
    });
  } catch (error) {
    next(error);
  }
}

// delete
export async function remove(req, res, next) {
  try {
    const id = req.user._id;
    await User.findByIdAndDelete(id).exec();
    res.json({
      success: true,
      message: `Removed ${User.modelName} Instance (${id})`,
    });
  } catch (error) {
    next(error);
  }
}

// other
export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: `No ${User.modelName} Found (${id})` });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.sendStatus(status.FORBIDDEN);

    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET); // TODO implement refresh tokens

    res.json({ accessToken }); // user details in signed token
  } catch (error) {
    next(error);
  }
}

// export async function logout(req, res, next) {}

// middleware to protect a route
export function authenticateToken(req, res, next) {
  const authorization = req.headers['authorization'];
  const [, token] = authorization.split(' '); // Bearer TOKEN

  if (!token) return res.sendStatus(status.UNAUTHORIZED);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(status.FORBIDDEN);
    req.user = User.hydrate(user);
    next();
  });
}
