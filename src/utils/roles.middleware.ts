import { RequestHandler } from 'express';
import { Service as AuthService } from '../use-cases/auth/auth.service';

const authService = new AuthService();

export function RolesMiddleware(roles: string[]) {
  const middleware: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
      const user = await authService.verify(String(authorization));

      if (user?.username === 'admin') {
        next();
        return;
      }

      for (const role of user?.roles) {
        if (roles.includes(role.slug)) {
          next();
          return;
        }
      }

      res.status(403).json({ error: 'Forbidden' });
    }
    catch (e) {
      next(e);
    }
  };

  return middleware;
}
