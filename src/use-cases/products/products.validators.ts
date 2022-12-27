import { z } from 'zod';

export const create = z.object({
  name: z.string().min(1).max(50),
  price: z.number().min(0),
  advantages: z.array(
    z.object({
      id: z.string(),
      description: z.string().min(1).max(50),
    })
  ),
});
export type Create = z.infer<typeof create>;

export const getById = z.object({
  id: z.string().min(1).max(50),
});
export type GetById = z.infer<typeof getById>;

export const update = create.partial().merge(
  z.object({
    active: z.boolean().optional(),
  })
);
export type Update = z.infer<typeof update>;

export const _delete = z.object({
  id: z.string().min(1).max(50),
});
export type Delete = z.infer<typeof _delete>;
