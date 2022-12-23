import { Router as ExpressRouter } from 'express';
import { Controller } from './server-info.controller';

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

    this.router.route('/one')
      .get(this.controller.getOne)
      .patch(this.controller.update)
      .delete(this.controller.delete);
  }
}
