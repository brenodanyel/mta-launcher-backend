import { RequestHandler } from 'express';
import { Service as AuthService } from '../use-cases/auth/auth.service';

const authService = new AuthService();

export function hasRole(authorization: string, checkRoles: string[]) {
  return new Promise(async (resolve) => {
    try {
      const user = await authService.verify(authorization);

      if (user?.username === 'admin') {
        resolve(true);
        return;
      }

      for (const role of user?.roles) {
        if (checkRoles.includes(role.slug)) {
          resolve(true);
          return;
        }
      }

      throw new Error('Forbidden');
    }
    catch {
      resolve(false);
    }
  });
}

export function RolesMiddleware(roles: string[]) {
  const middleware: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
      if (await hasRole(String(authorization), roles)) {
        next();
        return;
      }

      res.status(403).json({ errors: [{ message: 'Forbidden' }] });
    } catch (e) {
      next(e);
    }
  };

  return middleware;
}
