import { Router } from 'express';
import status from 'http-status';
import { authorize } from './middleware.js';

// Create
const create = ({ model }) => async (req, res, next) => {
  // use body and let schema validation handle keys
  try {
    const instance = new model(req.body);
    await instance.save();
    res.status(status.CREATED).json(instance);
  } catch (error) {
    next(error);
  }
};

// Read
const read = ({ model, name }) => async (req, res, next) => {
  try {
    const id = req.params.id;
    const instance = await model.findById(id).exec();
    if (instance) res.json(instance);
    else {
      res
        .status(status.NOT_FOUND)
        .json({ message: `No ${name} Found (${id})` });
    }
  } catch (error) {
    next(error); // forward on to middleware; handleCastError
  }
};

// Update
const replace = ({ model, name }) => async (req, res, next) => {
  try {
    const id = req.params.id;
    await model.findOneAndReplace({ _id: id }, req.body).exec();
    res.json({
      success: true,
      message: `Replaced ${name} Instance (${id})`,
    });
  } catch (error) {
    next(error); // forward on to middleware; handleCastError
  }
};

const modify = ({ model, name }) => async (req, res, next) => {
  try {
    const id = req.params.id;
    await model.findByIdAndUpdate(id, req.body).exec();
    res.json({
      success: true,
      message: `Modified ${name} Instance (${id})`,
    });
  } catch (error) {
    next(error);
  }
};

// Delete (Remove)
const remove = ({ model, name }) => async (req, res, next) => {
  try {
    const id = req.params.id;
    const instance = await model.findById(id).exec();
    if (!instance) {
      return res.status(status.NOT_FOUND).json({
        success: false,
        message: `No ${name} Instance Found (${id})`,
      });
    }
    await instance.remove();
    res.json({
      success: true,
      message: `Removed ${name} Instance (${id})`,
    });
  } catch (error) {
    next(error); // forward on to middleware; handleCastError
  }
};

// List (Paginated)
const list = ({ model, collection }) => async (req, res, next) => {
  try {
    let { limit = 10, page = 1, all = false } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    all = queryToBoolean(all);

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

    let query = model.find({});
    if (!all) {
      query = query
        .skip(limit * Math.max(page - 1, 0)) // no lower than the first page (0)
        .limit(limit);
    }
    const instances = await query.exec();
    const total = await model.countDocuments({}).exec();
    res.json({
      [collection]: instances,
      meta: {
        count: instances.length, // normally will be equal to limit, except for the final page
        total,
        page: all ? 1 : page,
        pages: all ? 1 : Math.ceil(total / limit),
        limit: all ? total : limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// prettier-ignore
const queryToBoolean = (query) => typeof query === 'boolean' ? query : query !== 'false';

const wrappedModel = (model) => ({
  model,
  name: model.modelName,
  collection: model.collection.name,
});

const defaultAuthConfig = {
  create: false,
  read: false,
  update: false, // replace and modify
  replace: false,
  modify: false,
  remove: false,
  list: false,
  verifier: null,
  madeBy: null,
};

export function resource(model, authConfig = defaultAuthConfig) {
  const config = { auth: { ...defaultAuthConfig, ...authConfig } };
  const router = new Router();
  const wrapped = wrappedModel(model);
  const { name } = wrapped;

  const auth = authorize(config.auth.verifier, config.auth.madeBy);
  const createAuth = authorize(config.auth.verifier); // specific auth for create, skip madeBy check

  router.post(`/${name}`, createAuth(config.auth.create), create(wrapped));
  router
    .route(`/${name}/:id`)
    .get(auth(config.auth.read), read(wrapped))
    .put(auth(config.auth.update || config.auth.replace), replace(wrapped))
    .patch(auth(config.auth.update || config.auth.modify), modify(wrapped))
    .delete(auth(config.auth.remove), remove(wrapped));

  router.get(`/${name}`, auth(authConfig.list), list(wrapped));

  return router;
}

export default resource;
