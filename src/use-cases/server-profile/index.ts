import { Router } from './products.routes';
import { Controller } from './server-profile.controller';
import { Service } from './server-profile.service';
import { PrismaModel } from './models/server-profile.model.prisma';

export function factory() {
  const model = new PrismaModel();
  const service = new Service(model);
  const controller = new Controller(service);
  const { router } = new Router(controller);
  return router;
}
