import { Request, Response, NextFunction } from "express";
import { AppError } from "../Util/AppError";

const devErrorHandler = (err: AppError, res: Response) => {
  res.status(err.httpCode).json({
    name: err.name,
    message: err.message,
  });
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  devErrorHandler(err, res);
};
