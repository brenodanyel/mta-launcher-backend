import { Router as ExpressRouter } from 'express';
import { Controller } from './temp.controller';

export class Router {
  public readonly router = ExpressRouter();

  constructor(
    private readonly controller = new Controller(),
  ) {
    this.setup();
  }

  setup() {
    this.router.route('/')
      .post(this.controller.create);
  }
}
