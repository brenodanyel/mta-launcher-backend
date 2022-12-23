import { z } from 'zod';
import validator from 'validator';

const IPValidator = z.string().refine((ip) => validator.isIP(ip), { message: 'IP is not valid' });
const PORTValidator = z.number().int().min(1).max(65535);

export const create = z.object({
  ip: IPValidator,
  port: PORTValidator,
  owner: z.string().min(5).max(100),
  description: z.string().min(5).max(100),
  externalLinks: z.record(z.string()),
  logo: z.string().min(5).max(100),
});
export type Create = z.infer<typeof create>;

export const getOne = z.object({
  ip: IPValidator,
  port: PORTValidator,
});
export type GetOne = z.infer<typeof getOne>;

export const update = z.object({
  ip: IPValidator,
  port: PORTValidator,

  overrides: z.object({
    ip: IPValidator.optional(),
    port: PORTValidator.optional(),
    owner: z.string().min(5).max(100).optional(),
    description: z.string().min(5).max(100).optional(),
    externalLinks: z.record(z.string()).optional(),
    logo: z.string().min(5).max(100).optional(),
  })
});
export type Update = z.infer<typeof update>;

export const _delete = z.object({
  ip: IPValidator,
  port: PORTValidator,
});
export type _Delete = z.infer<typeof _delete>;
