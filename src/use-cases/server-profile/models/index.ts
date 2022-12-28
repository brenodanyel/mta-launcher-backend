export type ExternalLinks = {
  name: string;
  url: string;
};

export type ServerProfile = {
  id: string;
  ip: string;
  port: number;
  description: string;
  logo: string;
  externalLinks: ExternalLinks[];
  ownerId: string;

  createdAt: Date;
  removeAt?: Date | null;
  active: boolean;

  owner?: {
    id: string;
    email: string;
    username: string;
  };
};

export interface IServerProfileRepository {
  getAll(): Promise<ServerProfile[]>;
  getAllByUserId(userId: string): Promise<ServerProfile[]>;
  getById(id: string): Promise<ServerProfile | null>;
  getByIpAndPort(ip: string, port: number): Promise<ServerProfile | null>;
  create(serverProfile: ServerProfile): Promise<ServerProfile>;
  update(id: string, overrides: Partial<ServerProfile>): Promise<ServerProfile>;
  delete(id: string): Promise<void>;
}
