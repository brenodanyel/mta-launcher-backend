import { RequestHandler } from 'express';
import { Service } from './server-info.service';
import { ServerInfo } from './server-info.types';

export class Controller {
  constructor(
    private readonly service: Service = new Service(),
  ) { }

  public readonly create: RequestHandler<{}, ServerInfo, {
    description: string;
    externalLinks: Record<string, string>;
    ip: string;
    logo: string;
    owner: string;
    port: number;
  }> = async (req, res, next) => {
    try {
      const { description, externalLinks, ip, logo, owner, port } = req.body;

      const server = await this.service.create({
        description, externalLinks, ip, logo, owner, port
      });

      res.status(201).json(server);
    } catch (e) {
      next(e);
    }
  };

  public readonly getAll: RequestHandler<{}, ServerInfo[]> = async (req, res, next) => {
    try {
      const servers = await this.service.getAll();
      res.status(200).json(servers);
    } catch (e) {
      next(e);
    }
  };

  public readonly getOne: RequestHandler<{}, ServerInfo, {}, { ip: string, port: string; }> = async (req, res, next) => {
    try {
      const { ip, port } = req.query;
      const server = await this.service.getOne({ ip, port: Number(port) });
      res.status(200).json(server);
    } catch (e) {
      next(e);
    }
  };

  public readonly update: RequestHandler<{}, ServerInfo, {
    ip: string;
    port: number;

    overrides: {
      ip?: string;
      port?: number;
      description?: string;
      externalLinks?: Record<string, string>;
      logo?: string;
      owner?: string;
    };

  }> = async (req, res, next) => {
    try {
      const { ip, port, overrides } = req.body;
      const server = await this.service.update({ ip, port, overrides });
      res.status(200).json(server);
    } catch (e) {
      next(e);
    }
  };

  public readonly delete: RequestHandler<{}, {}, {
    ip: string;
    port: number;
  }> = async (req, res, next) => {
    try {
      const { ip, port } = req.body;
      await this.service.delete({ ip, port });
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  };
}
