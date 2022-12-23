export type ServerInfo = {
  owner: string;

  ip: string;
  port: number;

  logo: string;
  description: string;
  externalLinks: Record<string, string>;
};
