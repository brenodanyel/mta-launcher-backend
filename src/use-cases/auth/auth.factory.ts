import { Router } from './auth.routes';
import { Controller } from './auth.controller';
import { Service } from './auth.service';

export function factory() {
  const service = new Service();
  const controller = new Controller(service);
  const { router } = new Router(controller);
  return router;
}
