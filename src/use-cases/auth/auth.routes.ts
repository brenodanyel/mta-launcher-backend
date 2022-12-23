import { Router as ExpressRouter } from 'express';
import { Controller } from './auth.controller';

export class Router {
  public readonly router = ExpressRouter();

  constructor(
    private readonly controller = new Controller(),
  ) {
    this.setup();
  }

  setup() {
    this.router.route('/signIn')
      .post(this.controller.signIn);

    this.router.route('/signUp')
      .post(this.controller.signUp);

    this.router.route('/verify')
      .get(this.controller.verify);
  }
}
