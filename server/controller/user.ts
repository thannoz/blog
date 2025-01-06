// deno-lint-ignore-file ban-types
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
// @ts-types="npm:@types/express@4"
import express, { Request, Response } from "npm:express@4.18.2";

import User from "../model/User.ts";
import { generateUniqueUsername, dataToSend } from "../utils/utils.ts";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const healthCheck: express.RequestHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    //console.log("Health check requested");
    res.status(200).send("health check, from Deno and Express");
  } catch (error) {
    //console.error("Error in health check: ", error);
    res.status(500).send("Internal Server Error");
  }
};

interface UserRequestBody extends Request {
  fullname: string;
  email: string;
  password: string;
}

const createUser: express.RequestHandler = async (
  req: Request<{}, {}, UserRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { fullname, email, password }: UserRequestBody = req.body;

    if (fullname.length < 3) {
      return res
        .status(403)
        .json({ error: "Full name must be at least 3 letters long" });
    }

    if (!email.length) {
      return res.status(403).json({ error: "Enter Email" });
    }

    if (!emailRegex.test(email)) {
      return res.status(403).json({
        error: "Email is invalid",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(403).json({
        error:
          "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
      });
    }

    const randomUsername = await generateUniqueUsername(email);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      personal_info: {
        password: hashedPassword,
        fullname: fullname,
        username: randomUsername,
        email: email,
      },
    });

    await newUser.save();
    return res.status(201).json(dataToSend(newUser));
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes("E11000")) {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ errorNotNow: err.message });
    } else {
      //console.error("Unexpected error: ", err);
      return res.status(500).send("Internal server error");
    }
  }
};

export { createUser, healthCheck };
