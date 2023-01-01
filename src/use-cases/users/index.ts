import { Router } from './users.routes';
import { Controller } from './users.controller';
import { Service } from './users.service';
import { PrismaModel } from './models/users.model.prisma';

export function factory() {
  const model = new PrismaModel();
  const service = new Service(model);
  const controller = new Controller(service);
  const { router } = new Router(controller);
  return router;
}
