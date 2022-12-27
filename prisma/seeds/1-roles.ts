import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient, Prisma } from '@prisma/client';

const data: Prisma.RoleCreateManyInput[] = [
  {
    id: uuidv4(),
    name: 'Admin',
    slug: 'admin',
  },
];

export default async function (client: PrismaClient) {
  await client.role.createMany({ data, skipDuplicates: true });
};
