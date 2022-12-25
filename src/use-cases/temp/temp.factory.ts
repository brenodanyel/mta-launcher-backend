import { Router } from './temp.routes';
import { Controller } from './temp.controller';

export function factory() {
  const controller = new Controller();
  const { router } = new Router(controller);
  return router;
}
