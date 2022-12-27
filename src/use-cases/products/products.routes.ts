import { Router as ExpressRouter } from 'express';
import { Controller } from './products.controller';
import { RolesMiddleware } from '../../utils/roles.middleware';

export class Router {
  public readonly router = ExpressRouter();

  constructor(private readonly controller = new Controller()) {
    this.setup();
  }

  setup() {
    this.router
      .route('/')
      .get(this.controller.getAll)
      .post(RolesMiddleware(['admin']), this.controller.create);

    this.router
      .route('/:id')
      .patch(RolesMiddleware(['admin']), this.controller.update)
      .delete(RolesMiddleware(['admin']), this.controller.delete)
      .get(this.controller.getById);
  }
}
