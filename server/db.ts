import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import mongoose from "npm:mongoose@^6.7";

const MONGODB_URI = Deno.env.get("MONGODB_URI") || "";
const DB_NAME = Deno.env.get("DB_NAME") || "";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  Deno.exit(1);
}

await mongoose
  .connect(MONGODB_URI, { dbName: DB_NAME })
  .then((_conn) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Cannot connect to mongodb ${err}`);
  });
