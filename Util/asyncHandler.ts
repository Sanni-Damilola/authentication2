import { Request, Response, NextFunction } from "express";

export const asyncHandler = (fu: any) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fu(req, res, next)).catch(next);
};
