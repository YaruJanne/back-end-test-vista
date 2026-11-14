import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, _res: Response, next: NextFunction): void {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // pass the request on to the next step
}