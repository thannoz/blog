import { useState } from "react";

import { cn } from "../lib/utils";

interface InputBoxProps {
  id?: string;
  value?: string;
  type: string;
  name: string;
  placeholder: string;
  icon: string;
}

const InputBox = ({
  id,
  type,
  name,
  placeholder,
  value,
  icon,
}: InputBoxProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i className={cn(`fi ${icon} input-icon`)}></i>
      {type === "password" ? (
        <i
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            `fi ${
              showPassword ? "fi-rr-eye" : "fi-rr-eye-crossed"
            } input-icon left-auto right-4 cursor-pointer`
          )}
        ></i>
      ) : null}
    </div>
  );
};

export default InputBox;
