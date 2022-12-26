import { Router as ExpressRouter } from 'express';
import { Controller } from './products.controller';

export class Router {
  public readonly router = ExpressRouter();

  constructor(
    private readonly controller = new Controller(),
  ) {
    this.setup();
  }

  setup() {
    this.router.route('/')
      .get(this.controller.getAll)
      .post(this.controller.create);

    this.router.route('/:id')
      .patch(this.controller.update)
      .delete(this.controller.delete)
      .get(this.controller.getById);
  }
}
