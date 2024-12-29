// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";
import { db, blog } from "./db.ts";

const app = express();
const PORT = Number(Deno.env.get("PORT")) || 3000;

const reqLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};

app.use(reqLogger);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello from Deno and Express!");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
