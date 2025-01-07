import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import {
  JWTPayload,
  jwtVerify,
  SignJWT,
} from "https://deno.land/x/jose@v5.9.4/index.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import User, { IUser } from "../model/User.ts";
const jwtSecret = Deno.env.get("JWT_SECRET");

export const generateUniqueUsername = async (
  email: string
): Promise<string> => {
  const username = email.split("@")[0];
  const isUnique = await User.exists({ "personal_info.username": username });

  return isUnique ? username : `${username}${nanoid().substring(0, 5)}`;
};

const secret = new TextEncoder().encode(jwtSecret);
const createJWT = async (payload: JWTPayload): Promise<string> => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  return jwt;
};
const _verifyJWT = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secret);
    //console.log("JWT is valid:", payload);
    return payload;
  } catch (error) {
    console.error(`Invalid JWT: ${error}`);
    return null;
  }
};

interface DataToSend {
  access_token: string;
  profileImg: string;
  username: string;
  fullname: string;
}
export const dataToSend = async (u: IUser) => {
  const jwtToken = await createJWT({ id: u._id });

  const user: DataToSend = {
    access_token: jwtToken,
    profileImg: u.personal_info.profile_img!,
    username: u.personal_info.username!,
    fullname: u.personal_info.fullname,
  };

  return user;
};
