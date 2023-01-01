import { Router as ExpressRouter } from 'express';
import { RolesMiddleware } from '../../utils/roles.middleware';
import { Controller } from './users.controller';

export class Router {
  public readonly router = ExpressRouter();

  constructor(
    private readonly controller = new Controller(),
  ) {
    this.setup();
  }

  setup() {
    this.router.route('/')
      .get(RolesMiddleware(['admin']), this.controller.getAll);
  }
}
