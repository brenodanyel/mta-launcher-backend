import { RequestHandler } from 'express';
import { Service } from './products.service';

export class Controller {
  constructor(private service: Service = new Service()) {}

  public readonly create: RequestHandler<
    {},
    {},
    {
      name: string;
      price: number;
      advantages: {
        id: string;
        description: string;
      }[];
    }
  > = async (req, res, next) => {
    try {
      const { name, price, advantages } = req.body;
      const product = await this.service.create({ name, price, advantages });
      res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly getAll: RequestHandler = async (req, res, next) => {
    try {
      const product = await this.service.getAll();
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly getById: RequestHandler<{
    id: string;
  }> = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.service.getById({ id });
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly update: RequestHandler<
    { id: string },
    {},
    {
      name?: string;
      price?: number;
      advantages?: {
        id: string;
        description: string;
      }[];
      active?: boolean;
    }
  > = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, advantages, active } = req.body;
      const product = await this.service.update(id, {
        name,
        price,
        advantages,
        active,
      });
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly delete: RequestHandler<{ id: string }> = async (
    req,
    res,
    next,
  ) => {
    try {
      const { id } = req.params;
      await this.service.delete({ id });
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  };
}
