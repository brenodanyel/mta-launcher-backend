import { ConflictError } from '../../utils/error-handling';
import { IUsersModel } from './models';
import { PrismaModel } from './models/users.model.prisma';
import * as validators from './users.validators';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';

export class Service {
  constructor(private model: IUsersModel = new PrismaModel()) { }

  async findUserById(id: string) {
    return this.model.findUserById(id);
  };

  async findUserByEmail(email: string) {
    return this.model.findUserByEmail(email);
  }

  async findUserByUsername(username: string) {
    return this.model.findUserByUsername(username);
  }

  async createUser(params: validators.CreateUser) {
    await validators.createUser.parseAsync(params);

    const { username, email, password } = params;

    const [userByEmail, userByUsername] = await Promise.all([
      this.model.findUserByEmail(email),
      this.model.findUserByUsername(username)
    ]);

    if (userByEmail) {
      throw new ConflictError('There is already a user with this email!');
    }

    if (userByUsername) {
      throw new ConflictError('There is already a user with this username!');
    }

    const id = randomUUID();

    return this.model.createUser({
      id,
      username,
      email,
      password: await hash(password, 10),
    });
  }

  async deleteUser(id: string) {
    const user = await this.model.findUserById(id);

    if (!user) {
      throw new Error('User not found!');
    }

    return this.model.deleteUser(user.id);
  }
}
