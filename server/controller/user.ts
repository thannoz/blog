// deno-lint-ignore-file ban-types
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
// @ts-types="npm:@types/express@4"
import express, { Request, Response, RequestHandler } from "express";

import { generateUniqueUsername, dataToSend } from "../utils/utils.ts";
import UserModel from "../model/User.ts";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// deno-lint-ignore require-await
const healthCheck: express.RequestHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).send("health check, from Deno and Express");
  } catch (error) {
    res.status(500).send(`Internal server errror: ${error}`);
  }
};

interface UserSignUpRequestBody extends Request {
  fullname: string;
  email: string;
  password: string;
}

// When a user is signed up, we create an access token that
// will be used by the user to browse throughout our application...
const signUp: RequestHandler = async (
  req: Request<{}, {}, UserSignUpRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { fullname, email, password }: UserSignUpRequestBody = req.body;

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

    const newUser = new UserModel({
      personal_info: {
        password: hashedPassword,
        fullname: fullname,
        username: randomUsername,
        email: email,
      },
    });

    await newUser.save();

    const data = await dataToSend(newUser);
    console.log("user sign up: ", data);
    return res.status(201).json(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "MongoServerError" && (err as any).code === 11000) {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).send("Internal server error");
  }
};

type SingInRequestBody = Omit<UserSignUpRequestBody, "fullname">;

const signIn: RequestHandler = async (
  req: Request<{}, {}, SingInRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { email, password }: SingInRequestBody = req.body;

    const user = await UserModel.findOne({ "personal_info.email": email });

    if (!user) {
      return res.status(403).json({ error: "User not found." });
    }

    const match = await bcrypt.compare(password, user?.personal_info.password);
    if (!match) {
      return res.status(403).json({ error: "Incorrect password" });
    }

    const data = await dataToSend(user);

    console.log("user signed in: ", data);
    return res.status(200).json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
};

export { healthCheck, signUp, signIn };
