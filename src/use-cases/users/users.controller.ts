import { RequestHandler } from 'express';
import { Service } from './users.service';

export class Controller {
  constructor(
    private readonly service: Service = new Service(),
  ) { }

  public getAll: RequestHandler = async (req, res, next) => {
    try {
      const users = await this.service.findAllUsers();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };
};
