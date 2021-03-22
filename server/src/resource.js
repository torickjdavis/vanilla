import { Router } from 'express';
// import status from 'statuses';
import status from 'http-status';

export class ModelController {
  constructor(model) {
    this.model = model;
    this.name = this.model.modelName;
    this.collection = this.model.collection.name;
  }

  // Create
  async create(req, res, next) {
    // use body and let schema validation handle keys
    try {
      console.debug(`Create ${this.name}`);
      const instance = new this.model(req.body);
      await instance.save();
      res.status(status.CREATED).json(instance);
    } catch (error) {
      next(error);
    }
  }

  // Read
  async read(req, res, next) {
    try {
      console.debug(`Read ${this.name}`);
      const id = req.params.id;
      const instance = await this.model.findById(id).exec();
      if (instance) res.json(instance);
      else {
        res
          .status(status.NOT_FOUND)
          .json({ message: `No ${this.name} Found (${id})` });
      }
    } catch (error) {
      next(error);
    }
  }

  // Update
  async replace(req, res, next) {
    try {
      console.debug(`Replace ${this.name}`);
      const id = req.params.id;
      await this.model.findOneAndReplace({ _id: id }, req.body).exec();
      res.json({
        success: true,
        message: `Replaced ${this.name} Instance (${id})`,
      });
    } catch (error) {
      next(error);
    }
  }

  async modify(req, res, next) {
    try {
      console.debug(`Modify ${this.name}`);
      const id = req.params.id;
      await this.model.findByIdAndUpdate(id, req.body).exec();
      res.json({
        success: true,
        message: `Modified ${this.name} Instance (${id})`,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete
  async delete(req, res, next) {
    try {
      console.debug(`Delete ${this.name}`);
      const id = req.params.id;
      await this.model.findByIdAndDelete(id).exec();
      res.json({
        success: true,
        message: `Deleted ${this.name} Instance (${id})`,
      });
    } catch (error) {
      next(error);
    }
  }

  // List (Paginated)
  async list(req, res, next) {
    try {
      console.debug(`List ${this.name}`);
      const { limit = 10, page = 0 } = req.query;
      const instances = await this.model
        .find({})
        .skip(limit * page)
        .limit(limit)
        .exec();
      const count = await this.model.count({}).exec();
      res.json({
        [this.collection]: instances,
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
  }
}

export function resource(model) {
  const router = new Router();
  const resource = new ModelController(model);
  const name = resource.name;

  // binding is necessary to resolve this in methods

  router.post(`/${name}`, resource.create.bind(resource));
  router
    .route(`/${name}/:id`)
    .get(resource.read.bind(resource))
    .put(resource.replace.bind(resource))
    .patch(resource.modify.bind(resource))
    .delete(resource.delete.bind(resource));
  router.get(`/${name}`, resource.list.bind(resource));

  return router;
}

export default resource;
