import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: { [key: string]: { message: string } };
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  let error: CustomError = { ...err };
  error.message = err.message;

  console.log(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError' && err instanceof mongoose.Error.CastError) {
    const message = `Resource not found`;
    error = new Error(message) as CustomError;
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message) as CustomError;
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError' && err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors as { [key: string]: { message: string } })
      .map(val => val.message)
      .join(', ');
    error = new Error(message) as CustomError;
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
