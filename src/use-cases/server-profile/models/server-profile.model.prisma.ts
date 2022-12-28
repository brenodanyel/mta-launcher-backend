import {
  ServerProfile as PrismaServerProfile,
  ServerProfileExternalLink as PrismaServerProfileExternalLink,
  User as PrismaUser,
} from '@prisma/client';

import { ServerProfile, IServerProfileRepository } from '.';
import { client } from '../../../../prisma';

export class PrismaModel implements IServerProfileRepository {
  private convert = (
    original: PrismaServerProfile & {
      externalLinks: PrismaServerProfileExternalLink[];
      owner: PrismaUser;
    },
  ): ServerProfile => ({
    id: original.id,
    ip: original.ip,
    port: original.port,
    description: original.description,
    logo: original.logo,
    externalLinks: original.externalLinks.map((externalLink) => ({
      id: externalLink.id,
      name: externalLink.name,
      url: externalLink.url,
    })),
    active: original.active,
    createdAt: original.createdAt,
    removeAt: original.removeAt,
    ownerId: original.ownerId,
    owner: {
      email: original.owner.email,
      id: original.owner.id,
      username: original.owner.username,
    }
  });

  async getAll(): Promise<ServerProfile[]> {
    const serverProfiles = await client.serverProfile.findMany({
      include: {
        externalLinks: true,
        owner: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return serverProfiles.map(this.convert);
  }

  async getAllByUserId(userId: string): Promise<ServerProfile[]> {
    const serverProfiles = await client.serverProfile.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        externalLinks: true,
        owner: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return serverProfiles.map(this.convert);
  }

  async getById(id: string): Promise<ServerProfile | null> {
    const serverProfile = await client.serverProfile.findFirst({
      where: { id },
      include: {
        externalLinks: true,
        owner: true,
      },
    });

    if (!serverProfile) {
      return null;
    }

    return this.convert(serverProfile);
  }

  async getByIpAndPort(
    ip: string,
    port: number,
  ): Promise<ServerProfile | null> {
    const serverProfile = await client.serverProfile.findFirst({
      where: {
        ip,
        port,
      },
      include: {
        externalLinks: true,
        owner: true,
      },
    });

    if (!serverProfile) {
      return null;
    }

    return this.convert(serverProfile);
  }

  async create(serverProfile: ServerProfile): Promise<ServerProfile> {
    const created = await client.serverProfile.create({
      data: {
        id: serverProfile.id,
        ip: serverProfile.ip,
        port: serverProfile.port,
        logo: serverProfile.logo,
        description: serverProfile.description,
        active: serverProfile.active,
        createdAt: serverProfile.createdAt,
        removeAt: serverProfile.removeAt,
        ownerId: serverProfile.ownerId,
        externalLinks: {
          create: serverProfile.externalLinks.map((externalLink) => ({
            name: externalLink.name,
            url: externalLink.url,
          })),
        },
      },
      include: {
        externalLinks: true,
        owner: true,
      },
    });

    return this.convert(created);
  }

  async update(
    id: string,
    overrides: Partial<ServerProfile>,
  ): Promise<ServerProfile> {
    const updated = await client.serverProfile.update({
      where: { id },
      data: {
        ip: overrides.ip,
        port: overrides.port,
        logo: overrides.logo,
        description: overrides.description,
        active: overrides.active,
        createdAt: overrides.createdAt,
        removeAt: overrides.removeAt,
        ownerId: overrides.ownerId,
        externalLinks: {
          deleteMany: { serverId: id },
          create: overrides.externalLinks?.map((externalLink) => ({
            name: externalLink.name,
            url: externalLink.url,
          })),
        },
      },
      include: {
        externalLinks: true,
        owner: true,
      },
    });

    return this.convert(updated);
  }

  async delete(id: string): Promise<void> {
    await client.serverProfile.delete({ where: { id } });
  }
}
