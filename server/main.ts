// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "npm:express@4.18.2";

import { db, blog } from "./db.ts";
import reqLogger from "./middlewares/logger.ts";

const app = express();
const PORT = Number(Deno.env.get("PORT")) || 3000;

app.use(express.json());

app.use(reqLogger);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello from Deno and Express!");
});

app.post("/signup", (req: Request, res: Response) => {
  let { fullname, email, password } = req.body;
  console.log(fullname, email, password);
  res.json(req.body);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
