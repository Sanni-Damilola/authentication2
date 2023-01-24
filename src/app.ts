import express, { Application } from "express";
import cors from "cors";
import route from "../routes/routes";
import morgan from "morgan";

export default function appConfig(app: Application) {
  app
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    // route
    .use("/api", route);
}
