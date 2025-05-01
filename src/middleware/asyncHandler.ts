import { Request, Response, NextFunction } from 'express';
import { AsyncRequestHandler } from '../types';

// Middleware to eliminate try/catch blocks in controllers
const asyncHandler =
  (fn: AsyncRequestHandler) =>
  (req: Request, res: Response, next: NextFunction): Promise<any> =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
