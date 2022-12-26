import { User, IUsersModel } from '.';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../../../prisma';

export class PrismaModel implements IUsersModel {
  private convert(input: User): User {
    return {
      id: input.id,
      email: input.email,
      username: input.username,
      password: input.password,
    };
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await client.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return this.convert(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await client.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return this.convert(user);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await client.user.findUnique({ where: { username } });

    if (!user) {
      return null;
    }

    return this.convert(user);
  }

  async createUser(data: User): Promise<User> {
    const user = await client.user.create({
      data: {
        id: uuidv4(),
        email: data.email,
        password: data.password,
        username: data.username,
      }
    });

    return this.convert(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await client.user.delete({ where: { id: userId } });
  }

  async updateUser(userId: string, overrides: Partial<User>): Promise<User> {
    const updated = await client.user.update({
      where: {
        id: userId,
      },
      data: {
        email: overrides.email,
        password: overrides.password,
        username: overrides.username,
      }
    });

    return this.convert(updated);
  }
}
