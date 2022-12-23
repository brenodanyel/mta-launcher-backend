import express from 'express';
import { HandleError } from './utils/error-handling';

export class App {
  private app = express();

  constructor() {
    this.app.use(express.json());

    this.app.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  public addRoute(prefix: string, route: express.Router) {
    this.app.use(prefix, route, HandleError);
  }
}
