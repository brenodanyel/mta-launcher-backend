import { Router } from './pulse.route';
import { Controller } from './pulse.controller';
import { Service } from './pulse.service';

export function factory() {
  const service = new Service();
  const controller = new Controller(service);
  const { router } = new Router(controller);
  return router;
}
