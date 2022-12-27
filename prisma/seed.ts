import fs from 'node:fs';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const main = async () => {
  const path = `${__dirname}/seeds/`;

  for (let file of fs.readdirSync(path)) {
    const res = await import(`${path}/${file}`);
    await res.default(client);
  }

  console.log('Seeding complete');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
