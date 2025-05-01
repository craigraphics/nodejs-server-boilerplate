import { Request, Response, NextFunction } from 'express';

export interface IItem {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export interface IItemDocument extends IItem, Document {
  _id: string;
}

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
