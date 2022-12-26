import { z } from 'zod';

export const signIn = z.object({
  email: z.string({ required_error: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
  password: z.string().min(6).max(20),
});

export type SignIn = z.infer<typeof signIn>;
