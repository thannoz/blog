import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

import User, { IUser } from "../model/User.ts";

export const generateUniqueUsername = async (
  email: string
): Promise<string> => {
  const username = email.split("@")[0];
  const isUnique = await User.exists({ "personal_info.username": username });

  return isUnique ? username : `${username}${nanoid().substring(0, 5)}`;
};

interface DataToSend {
  profileImg?: string;
  username?: string;
  fullname?: string;
}
export const dataToSend = (u: IUser) => {
  const user: DataToSend = {
    profileImg: u.personal_info.profile_img,
    username: u.personal_info.username,
    fullname: u.personal_info.fullname,
  };

  return user;
};
