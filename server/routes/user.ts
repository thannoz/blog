// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { createUser, healthCheck } from "../controller/user.ts";

const router = express.Router();

router.get("/health", healthCheck);
router.post("/signup", createUser);

export default router;
