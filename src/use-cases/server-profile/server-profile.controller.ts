import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Service } from './server-profile.service';
import { Service as AuthService } from '../auth/auth.service';
import { hasRole } from '../../utils/roles.middleware';

export class Controller {
  constructor(
    private service: Service = new Service(),
    private authService: AuthService = new AuthService(),
  ) { }

  public readonly create: RequestHandler<
    {},
    {},
    {
      ip: string;
      port: string;
      description: string;
      logo: string;
      externalLinks: string;
      removeAt: string | null;
    }
  > = async (req, res, next) => {
    try {
      const { ip, port, description, externalLinks, removeAt } = req.body;
      const logo = req.files?.logo as UploadedFile;
      const { authorization } = req.headers;

      const user = await this.authService.verify(String(authorization));

      const product = await this.service.create({
        ip,
        port: Number(port),
        description,
        logo,
        externalLinks: JSON.parse(externalLinks),
        ownerId: user.id,
        removeAt: removeAt ? new Date(removeAt) : null,
      });

      res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly getAll: RequestHandler<
    {},
    unknown,
    {},
    {
      ip?: string;
      port?: string;
    }
  > = async (req, res, next) => {
    try {
      const { ip, port } = req.query;
      if (ip && port) {
        const result = await this.service.getByIpAndPort({ ip, port: Number(port) });
        res.status(200).json(result);
      }
      const result = await this.service.getAll();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public readonly getAllMine: RequestHandler = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const user = await this.authService.verify(String(authorization));

      if (await hasRole(String(authorization), ['admin'])) {
        const product = await this.service.getAll();
        res.status(200).json(product);
        return;
      }

      const product = await this.service.getAllByUserId(user.id);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly getById: RequestHandler<
    {
      id: string;
    }
  > = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.service.getById({ id });
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly update: RequestHandler<
    { id: string; },
    {},
    {
      ip?: string;
      port?: string;
      description?: string;
      logo?: string;
      externalLinks?: string;
      ownerId?: string;
      removeAt?: string | null;
    }
  > = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { ip, port, description, externalLinks, ownerId, removeAt } = req.body;
      const logo = req.files?.logo as UploadedFile;
      const { authorization } = req.headers;

      let newOwnerId;

      if (await hasRole(String(authorization), ['admin']) && ownerId) {
        newOwnerId = ownerId;
      }

      const product = await this.service.update(id, {
        ip,
        port: Number(port),
        description,
        logo,
        externalLinks: externalLinks ? JSON.parse(externalLinks) : undefined,
        ...newOwnerId && { ownerId: newOwnerId },
        removeAt: removeAt ? new Date(removeAt) : null,
      });
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  public readonly delete: RequestHandler<
    { id: string; }
  > = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.service.delete({ id });
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  };
}