import { z } from 'zod';

export const create = z.object({
  name: z.string().min(1).max(50),
  price: z.number().min(0),
  advantages: z.array(z.string().min(1).max(50)),
});
export type Create = z.infer<typeof create>;
