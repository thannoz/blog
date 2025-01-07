// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { signUp, healthCheck, signIn } from "../controller/user.ts";

const router = express.Router();

router.get("/health", healthCheck);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
