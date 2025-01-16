// @ts-types="npm:@types/express@4"
import express from "express";
import cors from "npm:cors@2.8.5";

import "./db.ts";

import user from "./routes/user.ts";
import reqLogger from "./middleware/logger.ts";

const PORT = Number(Deno.env.get("PORT")) || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(reqLogger);

app.use("/", user);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
