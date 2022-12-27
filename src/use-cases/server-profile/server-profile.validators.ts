import { z } from 'zod';
import { UploadedFile } from 'express-fileupload';
import validator from 'validator';

const IPValidator = z
  .string()
  .refine((ip) => validator.isIP(ip), { message: 'IP is not valid' });
const PORTValidator = z.number().int().min(1).max(65535);

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_FILE_SIZE = 1024 * 1024 * 8.5; // 500 kb

export const create = z.object({
  ip: IPValidator,
  port: PORTValidator,
  ownerId: z.string().min(5).max(100),
  description: z.string().max(6000),
  externalLinks: z.array(
    z.object({
      name: z.string().min(5).max(100),
      url: z.string().min(5).max(100),
    }),
  ),
  logo: z
    .object({
      name: z.string().refine(
        (value) => {
          const ext = value.split('.').at(-1);
          return ext && ALLOWED_FILE_TYPES.includes(ext);
        },
        {
          message: `Logo file extension is not valid! (allowed types: ${ALLOWED_FILE_TYPES.join(
            ', ',
          )})`,
        },
      ),
      data: z.instanceof(Buffer),
      encoding: z.string(),
      md5: z.string(),
      mimetype: z.string(),
      truncated: z.boolean(),
      size: z.number().max(MAX_FILE_SIZE, {
        message: `Logo file size is too big! (max size: ${
          MAX_FILE_SIZE / 1024 / 1024
        } MB)`,
      }),
    })
    .optional(),
});
export type Create = z.infer<typeof create>;

export const getById = z.object({
  id: z.string().min(1).max(50),
});
export type GetById = z.infer<typeof getById>;

export const getByIpAndPort = z.object({
  ip: IPValidator,
  port: PORTValidator,
});
export type GetByIpAndPort = z.infer<typeof getByIpAndPort>;

export const update = create.partial();
export type Update = z.infer<typeof update>;

export const _delete = z.object({
  id: z.string().min(1).max(50),
});
export type Delete = z.infer<typeof _delete>;
