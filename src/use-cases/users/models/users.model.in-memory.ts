import { User, IUsersModel } from './users.model.interface';

export class InMemoryModel implements IUsersModel {
  private users: User[] = [];


  async findUserById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id) || null;
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email) || null;
    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username) || null;
    return user;
  }

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async deleteUser(user: User): Promise<void> {
    this.users = this.users.filter((_user) => {
      return !(user.id === _user.id);
    });
  }

  async updateUser(user: User, changes: Partial<User>): Promise<User> {
    let found;

    this.users = this.users.map((_user) => {
      if (user.id === _user.id) {
        const result = { ..._user, ...changes };
        found = result;
        return result;
      }

      return user;
    });

    if (!found) {
      throw new Error('User not found!');
    }

    return found;
  }
}
