export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
};

export interface IUsersModel {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  deleteUser(user: User): Promise<void>;
  updateUser(user: User, changes: Partial<User>): Promise<User>;
}
