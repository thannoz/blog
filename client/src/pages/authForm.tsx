import InputBox from "../components/InputBox";

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
      </form>
    </section>
  );
};

export default AuthForm;
