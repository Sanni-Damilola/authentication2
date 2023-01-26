import express, { Application } from "express";
import dbFuction from "../config/db";
import appConfig from "../src/app";

const port: number | string = 2001 || process.env.port;

const app: Application = express();

process.on("uncaughtException", (err: Error) => {
  console.log("uncaughtException", "server shutting down");
  console.log(err.name, err.message);
  process.exit(1);
});

appConfig(app);
dbFuction();

const server = app.listen(port, () => {
  console.log("Done! on port", port);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", "server shutting down");
  console.log(reason.message, reason);
  server.close(() => {
    process.exit(1);
  });
});
