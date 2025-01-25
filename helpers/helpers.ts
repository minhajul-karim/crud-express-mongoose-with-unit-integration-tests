/*
 * Title: Helpers
 * Description: Helper functions that help the applicatoin to run
 * Author: Minhajul Karim
 * Date: 24 Jan 2025
 */

// Dependencies
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

// Database connection with mongoose
const db = process.env.NODE_ENV === 'test' ? 'test-customers' : 'customers';

export const connectToMongodb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${db}`);
    next();
  } catch (err) {
    next(err);
  }
};

// Error handler middleware
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    console.log(err);
    res.status(500).send('INTERNAL SERVR ERROR! :(');
  }
  return next(err);
};