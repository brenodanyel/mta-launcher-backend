import { RequestHandler } from 'express';
import { Service } from './pulse.service';

export class Controller {
  constructor(
    private readonly service: Service = new Service()
  ) { };

  getStats: RequestHandler = (req, res, next) => {
    try {
      const ip = req.ip;
      console.log(ip);
      this.service.handlePulse(ip);
      const stats = this.service.getStats();
      res.status(200).json(stats);
    } catch (e) {
      next(e);
    }
  };
}
