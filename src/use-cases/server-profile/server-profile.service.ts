import { v4 as uuidv4 } from 'uuid';
import { PrismaModel } from './models/server-profile.model.prisma';
import { IServerProfileRepository } from './models';
import { ConflictError, NotFoundError } from '../../utils/error-handling';
import { AWS_S3_HELPER } from '../../utils/aws-s3-helper';
import * as validators from './server-profile.validators';

export class Service {
  constructor(
    private model: IServerProfileRepository = new PrismaModel(),
    private awsS3Helper: AWS_S3_HELPER = new AWS_S3_HELPER(),
  ) { }

  async create(params: validators.Create) {
    await validators.create.parseAsync(params);

    const { ip, port, description, logo, externalLinks, ownerId, removeAt } = params;

    if (await this.model.getByIpAndPort(ip, port)) {
      throw new ConflictError(
        'Server profile with this IP and port already exists',
      );
    }

    const id = uuidv4();

    let logoUrl = null;

    if (logo) {
      const uploaded = await this.awsS3Helper.uploadFile({
        file: logo,
        fileId: id,
        folder: 'logos',
      });

      if (uploaded.Location) {
        logoUrl = uploaded.Location;
      }
    }

    const created = await this.model.create({
      id,
      ip,
      port,
      description,
      logo: logoUrl,
      active: true,
      createdAt: new Date(),
      removeAt,
      ownerId,
      externalLinks,
    });

    return created;
  }

  async getAll() {
    return this.model.getAll();
  }

  async getAllByUserId(userId: string) {
    return this.model.getAllByUserId(userId);
  }

  async getById(params: validators.GetById) {
    await validators.getById.parseAsync(params);
    const { id } = params;
    return this.model.getById(id);
  }

  async getByIpAndPort(params: validators.GetByIpAndPort) {
    await validators.getByIpAndPort.parseAsync(params);
    const { ip, port } = params;
    return this.model.getByIpAndPort(ip, port);
  }

  async update(id: string, params: validators.Update) {
    await validators.update.parseAsync(params);

    const { ip, port, description, logo, externalLinks, ownerId, removeAt } = params;

    if (ip && port) {
      const serverProfile = await this.model.getByIpAndPort(ip, port);
      if (serverProfile && serverProfile.id !== id) {
        throw new ConflictError(
          'Server profile with this IP and port already exists',
        );
      }
    }

    const profile = await this.model.getById(id);

    if (!profile) {
      throw new NotFoundError('Server Profile not found');
    }

    // DELETE PREVIOUS LOGO FROM AWS S3
    if (logo) {
      const fileName = profile.logo?.split('/').at(-1);
      if (fileName) {
        await this.awsS3Helper.deleteFile({
          folder: 'logos',
          fileName,
        });
      }
    }

    let logoUrl;

    if (logo) {
      const uploaded = await this.awsS3Helper.uploadFile({
        file: {
          data: logo.data,
          mimetype: logo.mimetype,
          name: logo.name,
        },
        fileId: id,
        folder: 'logos',
      });

      logoUrl = uploaded.Location;
    }

    const updated = this.model.update(id, {
      ip,
      port,
      description,
      logo: logoUrl,
      active: true,
      ownerId,
      externalLinks,
      removeAt,
    });

    return updated;
  }

  async delete(params: validators.Delete) {
    await validators._delete.parseAsync(params);

    const { id } = params;

    const profile = await this.model.getById(id);

    if (!profile) {
      throw new NotFoundError('Server Profile not found');
    }

    // DELETE LOGO FROM AWS S3
    const fileName = profile.logo?.split('/').at(-1);
    if (fileName) {
      await this.awsS3Helper.deleteFile({
        folder: 'logos',
        fileName,
      });
    }

    return this.model.delete(id);
  }
}
