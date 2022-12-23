import { z } from 'zod';

export const signIn = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export type SignIn = z.infer<typeof signIn>;
