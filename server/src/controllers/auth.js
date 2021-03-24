import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import status from 'http-status';

const SALT_ROUNDS = 10;

const { JWT_SECRET } = process.env;

// create
export async function register(req, res, next) {
  // use body and let schema validation handle keys
  try {
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS); // reassign with hash
    const user = new User(req.body);
    await user.save();
    res.status(status.CREATED).json(user);
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(status.BAD_REQUEST).json({ message: 'Account Exists' });
    } else next(error);
  }
}

// read (details only)
export async function details(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('-password').exec(); // exclude password hash
    if (user) res.json(user);
    else {
      res
        .status(status.NOT_FOUND)
        .json({ message: `No ${User.modelName} Found (${id})` });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(status.BAD_REQUEST).json({
        message: `Invalid ${error.kind}`,
        reason: error.reason.message,
      });
    } else next(error);
  }
}

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

// list
export async function list(req, res, next) {
  try {
    let { limit = 10, page = 1 } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    if (isNaN(limit) || limit !== Number(limit)) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: 'Limit must be an Integer.' });
    }

    if (isNaN(page) || page !== Number(page)) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: 'Page must be an Integer.' });
    }

    const users = await User.find({})
      .select('-password') // exclude hashes
      .skip(limit * Math.max(page - 1, 0)) // no lower than the first page (0)
      .limit(limit)
      .exec();
    const total = await User.countDocuments({}).exec();
    res.json({
      [User.collection.name]: users,
      meta: {
        count: users.length, // normally will be equal to limit, except for the final page
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
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
        .json({ message: `No ${User.modelName} Found` });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.sendStatus(status.FORBIDDEN);

    // TODO implement refresh tokens
    const accessToken = jwt.sign(user.toJSON(), JWT_SECRET, {
      expiresIn: '1d',
    });

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

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(status.FORBIDDEN);
    req.user = User.hydrate(user);
    next();
  });
}
