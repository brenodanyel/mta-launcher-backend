import { Router } from './server-info.routes';
import { Controller } from './server-info.controller';
import { Service } from './server-info.service';
import { InMemoryModel } from './models/server-info.model.in-memory';

export function factory() {
  const model = new InMemoryModel();
  const service = new Service(model);
  const controller = new Controller(service);
  const { router } = new Router(controller);
  return router;
}
