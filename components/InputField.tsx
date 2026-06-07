"use client";

import { Eye, EyeClosed } from "lucide-react";
import { JSX, RefObject, useState } from "react";
import { twMerge } from "tailwind-merge";

const InputField = ({
  type = "text",
  Icon,
  name,
  id,
  theme = "light",
  value,
  setValue = () => {},
  onChange = () => {},
  placeholder,
  className,
  disabled = false,
  ref,
  onFocus,
  onBlur,
  maxLength,
}: {
  type?: string;
  name?: string;
  id?: string;
  Icon?: any;
  theme?: "light" | "dark";
  value?: any;
  setValue?: (value: string) => void;
  onChange?: (e: any) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ref?: RefObject<any>;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
}): JSX.Element => {
  const [passVisible, setPassVisible] = useState(false);
  const themes = {
    light: "border-slate-400 hover:border-dark",
    dark: "border-slate-500 text-slate-300",
  };
  return (
    <div
      className={twMerge(
        "flex h-10 w-full rounded-md border",
        themes[theme],
        className,
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      {Icon && (
        <span
          className={`h-full w-10 grid place-items-center ${theme === "light" ? "text-black" : "text-white"}`}
        >
          <Icon size={18} />
        </span>
      )}
      <input
        className={`${Icon ? "" : "px-2"} text-sm min-w-0 flex-1`}
        type={type !== "password" ? type : passVisible ? "text" : "password"}
        name={name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        placeholder={placeholder}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
        id={id}
      />
      {maxLength && (
        <span className="text-xs h-full pr-1.5 flex items-center text-slate-500">
          {maxLength - value.length}
        </span>
      )}
      {type === "password" && (
        <button
          className="h-full w-8 grid place-items-center cursor-pointer"
          type="button"
          onClick={() => setPassVisible((prev) => !prev)}
        >
          {passVisible ? <Eye size={17} /> : <EyeClosed size={17} />}
        </button>
      )}
    </div>
  );
};

export default InputField;
