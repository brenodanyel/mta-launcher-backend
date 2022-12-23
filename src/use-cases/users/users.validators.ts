import { z } from 'zod';

export const createUser = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
});

export type CreateUser = z.infer<typeof createUser>;
