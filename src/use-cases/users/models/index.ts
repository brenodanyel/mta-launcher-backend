export type User = {
  id: string;
  email: string;
  username: string;
  password?: string;
  roles?: {
    id: string;
    slug: string;
    name: string;
  }[];
};

export interface IUsersModel {
  findAllUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
  updateUser(id: string, overrides: Partial<User>): Promise<User>;
}
