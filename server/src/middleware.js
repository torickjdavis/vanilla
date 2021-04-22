import { isDev } from './utils.js';
import mongoose from 'mongoose';
import status from 'http-status';

export function notFound(req, res, next) {
  res.status(status.NOT_FOUND);
  next(new Error(`Not Found ${req.originalUrl}`));
}

export function handleCastError(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(status.BAD_REQUEST).json({
      message: `Invalid ${error.kind}`,
      reason: error.reason.message,
    });
  } else next(error);
}

export function handleDuplicateError(error, req, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    res.status(status.BAD_REQUEST).json({ message: 'Unique Index Fail' });
  } else next(error);
}

export function error(err, req, res, next) {
  // if it's still success, resolve as error
  if (res.statusCode == status.OK) res.status(status.INTERNAL_SERVER_ERROR);
  console.error(err);
  res.json({
    message: err.message,
    stack: isDev ? err.stack : '🥞',
  });
}
