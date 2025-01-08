import axios from "axios";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface FormDataProps {
  email: string;
  password: string;
  fullname?: string;
}

interface ApiResponse {
  access_token: string;
  profileImg: string;
  username: string;
  fullname?: string;
}

const baseURL: string = import.meta.env.VITE_SERVER_DOMAIN;

export const sendDataToServer = async (
  serverRoute: string,
  formData: FormDataProps
): Promise<void> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${baseURL}${serverRoute}`,
      formData
    );
    console.log("response", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.error;
      if (backendMessage) {
        console.log(`Error: ${backendMessage}`);
      } else {
        console.log(`Error sending request: ${error.message}`);
      }
    } else {
      console.log(`An unexpected error occurred: ${error}`);
    }
  }
};
