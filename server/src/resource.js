import { Router } from 'express';
// import status from 'statuses';
import status from 'http-status';

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
    next(error);
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
    next(error);
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
    await model.findByIdAndDelete(id).exec();
    res.json({
      success: true,
      message: `Removed ${name} Instance (${id})`,
    });
  } catch (error) {
    next(error);
  }
};

// List (Paginated)
const list = ({ model, collection }) => async (req, res, next) => {
  try {
    const { limit = 10, page = 0 } = req.query;
    const instances = await model
      .find({})
      .skip(limit * page)
      .limit(limit)
      .exec();
    const count = await model.count({}).exec();
    res.json({
      [collection]: instances,
      meta: {
        count,
        page,
        pages: Math.ceil(count / limit),
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const wrappedModel = (model) => ({
  model,
  name: model.modelName,
  collection: model.collection.name,
});

export function resource(model) {
  const router = new Router();
  const wrapped = wrappedModel(model);
  const { name } = wrapped;

  router.post(`/${name}`, create(wrapped));
  router
    .route(`/${name}/:id`)
    .get(read(wrapped))
    .put(replace(wrapped))
    .patch(modify(wrapped))
    .delete(remove(wrapped));
  router.get(`/${name}`, list(wrapped));

  return router;
}

export default resource;
