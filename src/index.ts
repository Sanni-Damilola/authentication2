import express, { Application } from "express";
import dbFuction from "../config/db";
import appConfig from "../src/app";

const port: number | string = 2001 || process.env.port;

const app: Application = express();

appConfig(app);
dbFuction();


app.listen(port, () => {
  console.log("Done! on port", port);
});
