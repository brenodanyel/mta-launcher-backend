import { ConflictError, NotFoundError } from '../../utils/error-handling';
import { InMemoryModel } from './models/server-info.model.in-memory';
import { IServerModel } from './models/server-info.model.interface';
import * as validators from './server-info.validators';

export class Service {
  constructor(
    private readonly model: IServerModel = new InMemoryModel(),
  ) { }

  async create(params: validators.Create) {
    await validators.create.parseAsync(params);

    const existentServer = await this.model.getOne(params.ip, params.port);
    if (existentServer) {
      throw new ConflictError('Server already exists!');
    }

    const createdServer = await this.model.create(params);
    return createdServer;
  }

  async getAll() {
    const servers = await this.model.getAllServers();
    return servers;
  }

  async getOne(params: validators.GetOne) {
    await validators.getOne.parseAsync(params);

    const foundServer = await this.model.getOne(params.ip, params.port);
    if (!foundServer) {
      throw new NotFoundError('Server not found!');
    }

    return foundServer;
  }

  async update(params: validators.Update) {
    await validators.update.parseAsync(params);
    const { ip, port, overrides } = params;

    const existentServer = await this.model.getOne(ip, port);
    if (!existentServer) {
      throw new NotFoundError('Server not found!');
    }

    const updatedServer = await this.model.update(ip, port, {
      ...(overrides.ip && { ip: overrides.ip }),
      ...(overrides.port && { port: overrides.port }),
      ...(overrides.owner && { owner: overrides.owner }),
      ...(overrides.description && { description: overrides.description }),
      ...(overrides.externalLinks && { externalLinks: overrides.externalLinks }),
      ...(overrides.logo && { logo: overrides.logo }),
    });

    return updatedServer;
  }

  async delete(params: validators._Delete) {
    await validators._delete.parseAsync(params);
    const { ip, port } = params;

    const existentServer = await this.model.getOne(ip, port);
    if (!existentServer) {
      throw new NotFoundError('Server not found!');
    }

    await this.model.delete(ip, port);
  }
}
