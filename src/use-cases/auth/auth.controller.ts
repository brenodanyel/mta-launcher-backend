import { RequestHandler } from 'express';
import { Service } from './auth.service';

export class Controller {
  constructor(
    private service: Service = new Service()
  ) { }

  public readonly signIn: RequestHandler<
    {},
    {
      token: string;
    },
    {
      email: string;
      password: string;
    }
  > = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.signIn({ email, password });
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };

  public readonly signUp: RequestHandler<
    {},
    {
      token: string;
    },
    {
      username: string;
      email: string;
      password: string;
    }
  > = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const token = await this.service.signUp({ username, email, password });
      res.status(201).json({ token });
    } catch (e) {
      next(e);
    }
  };

  public readonly verify: RequestHandler = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const result = await this.service.verify(String(authorization));
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}
