import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import googleIcon from "../img/google.png";

interface AuthFormProps {
  authType: string;
}

const AuthForm = ({ authType }: AuthFormProps) => {
  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
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

        <button className="btn-dark center mt-14">
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
  );
};

export default AuthForm;
