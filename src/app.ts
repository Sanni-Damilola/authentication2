import express, { Application, Response, Request, NextFunction } from "express";
import cors from "cors";
import route from "../routes/routes";
import morgan from "morgan";
import { errorHandler } from "../middleware/errorHandler";
import { AppError, HttpCode } from "../Util/AppError";

export default function appConfig(app: Application) {
  app
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    // route
    .use("/api", route)
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `This route ${req.originalUrl} does not exist`,
          httpCode: HttpCode.Not_Found,
          isOperational: true,
        })
      );
    })
    .use(errorHandler); // error handler; note: it should be the last in your app
}
