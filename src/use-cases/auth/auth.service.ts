import { NotFoundError, InvalidTokenError } from '../../utils/error-handling';
import { Service as UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as validators from './auth.validators';

const { JWT_SECRET = 'secret' } = process.env;

export class Service extends UsersService {
  public async signIn(params: validators.SignIn): Promise<string> {
    await validators.signIn.parseAsync(params);

    const { email, password } = params;

    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError('Invalid email or password');
    }

    const correctPass = await compare(password, user.password);

    if (!correctPass) {
      throw new NotFoundError('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      {
        user: userWithoutPassword,
      },
      JWT_SECRET,
    );

    return 'Bearer ' + token;
  }

  public async signUp(params: { username: string, email: string, password: string; }): Promise<string> {
    const { username, email, password } = params;

    const user = await this.createUser({
      username, email, password,
    });

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      {
        user: userWithoutPassword,
      },
      JWT_SECRET,
    );

    return 'Bearer ' + token;
  }

  public async verify(rawToken: string) {
    try {
      const [, token] = rawToken.split(' ');
      const { user } = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

      const dbUser = await this.findUserById(user.id);

      if (!dbUser) {
        throw new InvalidTokenError('Invalid token');
      }

      const { password: _, ...userWithoutPassword } = dbUser;

      return {
        ...user,
        ...userWithoutPassword,
      };

    } catch (e) {
      throw new InvalidTokenError('Invalid token');
    }
  }
}
