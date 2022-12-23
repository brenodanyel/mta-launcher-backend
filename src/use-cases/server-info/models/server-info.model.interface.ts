import { ServerInfo } from '../server-info.types';

export interface IServerModel {
  getAllServers(): Promise<ServerInfo[]>;
  getOne(ip: string, port: number): Promise<ServerInfo | null>;
  create(server: ServerInfo): Promise<ServerInfo>;
  update(ip: string, port: number, newServerInfo: Partial<ServerInfo>): Promise<ServerInfo>;
  delete(ip: string, port: number): Promise<void>;
}
