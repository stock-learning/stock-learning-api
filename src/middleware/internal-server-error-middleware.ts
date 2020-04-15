import { NextFunction, Request, Response } from 'express';

const internalServerErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  console.error(err);
  return res.status(500).json({
    message: 'Internal Server Error',
    error: err
  });
};


export default internalServerErrorMiddleware;
