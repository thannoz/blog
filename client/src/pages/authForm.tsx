import axios from "axios";
import { useRef, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import InputBox from "../components/InputBox";
import googleIcon from "../img/google.png";
import AnimationWrapper from "../common/animation-wrapper";
import { useUserContext } from "../hooks/use-context.ts";
import { FormDataProps } from "../types/formData.ts";
import { ApiResponse } from "../types/apiResponse.ts";
import { setItem } from "../utils/localStorage.ts";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const baseURL: string = import.meta.env.VITE_SERVER_DOMAIN;

interface AuthFormProps {
  authType: string;
}

const AuthForm = ({ authType }: AuthFormProps) => {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      navigate("/");
    }
  }, [access_token]);

  const authFormRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      fullname: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;
    const fullname = target.fullname ? target.fullname.value : "";

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Full name must be at least 3 letters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter Email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
      );
    }

    const inputFullname = target.fullname ? target.fullname.value : "";
    const customFormData = {
      email: target.email.value,
      password: target.password.value,
      ...(inputFullname && { fullname: inputFullname }),
    };

    const serverRoute = authType === "sign-in" ? "/signin" : "/signup";

    const sendToServer = async (
      serverRoute: string,
      formData: FormDataProps
    ) => {
      try {
        const response = await axios.post<ApiResponse>(
          `${baseURL}${serverRoute}`,
          formData
        );
        if (serverRoute === "/signin") {
          setItem("user", JSON.stringify(response.data));
          setUserAuth(response.data);
          return;
        }
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

    sendToServer(serverRoute, customFormData);
  };

  return (
    <AnimationWrapper keyValue={authType}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form
          onSubmit={handleSubmit}
          ref={authFormRef}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-3xl font-thin capitalize text-center mb-20">
            {authType === "sign-in" ? "Welcome back" : "Join us Today"}
          </h1>
          {authType !== "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : null}
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />

          <button type="submit" className="btn-dark center mt-14">
            {authType.replace("-", " ")}
          </button>

          <div
            className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase
        text-black font-bold"
          >
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center justify-center gap-2 w-[90&] center">
            <img src={googleIcon} alt="google icon" className="w-5" />
            continue with google
          </button>

          {authType === "sign-in" ? (
            <p className="text-center mt-6 text-dark-grey text-xl">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="text-center mt-6 text-dark-grey text-xl">
              Already have an account?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default AuthForm;
