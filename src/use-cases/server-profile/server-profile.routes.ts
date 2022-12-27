import { Router as ExpressRouter } from 'express';
import { RolesMiddleware } from '../../utils/roles.middleware';
import { Controller } from './server-profile.controller';

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
      .post(RolesMiddleware(['admin']), this.controller.create);

    this.router.route('/me')
      .get(this.controller.getAllMine);

    this.router.route('/:id')
      .patch(this.controller.update)
      .delete(this.controller.delete)
      .get(this.controller.getById);

    this.router.route('/:ip/:port')
      .get(this.controller.getByIpAndPort);
  }
}
