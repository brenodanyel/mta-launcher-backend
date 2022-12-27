import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient, Prisma } from '@prisma/client';

const data: Prisma.UserCreateManyInput[] = [
  {
    id: uuidv4(),
    username: 'admin',
    password: uuidv4(),
    email: 'admin@admin.com',
  },
];

export default async function (client: PrismaClient) {
  await client.user.createMany({ data, skipDuplicates: true });
};
