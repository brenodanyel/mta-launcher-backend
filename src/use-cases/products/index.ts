import { Router } from './products.routes';
import { Controller } from './products.controller';
import { Service } from './products.service';
import { InMemoryModel } from './models/products.model.in-memory';

export function factory() {
  const model = new InMemoryModel();
  const service = new Service(model);
  const controller = new Controller(service);
  const { router } = new Router(controller);
  return router;
}
