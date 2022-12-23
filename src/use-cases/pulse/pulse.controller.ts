import { RequestHandler } from 'express';
import { Service } from './pulse.service';

export class Controller {
  constructor(
    private readonly service: Service = new Service()
  ) { };

  getStats: RequestHandler = (req, res, next) => {
    try {
      this.service.handlePulse(req.ip);
      const stats = this.service.getStats();
      res.status(200).json(stats);
    } catch (e) {
      next(e);
    }
  };
}
