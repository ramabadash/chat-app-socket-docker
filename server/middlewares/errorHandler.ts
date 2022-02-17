import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  if (err.status && err.message) return res.status(err.status).json(err.message);

  res.status(500).json('Server error, please try again later');
};

export default errorHandler;
