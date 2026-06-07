import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function Button({
  children,
  type,
  className,
  style = "default",
  size = "small",
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  style?: "default" | "primary" | "dark" | "danger" | "danger2";
  size?: "small" | "medium" | "large";
  onClick?: any;
  disabled?: boolean;
}) {
  const styles = {
    default: "bg-slate-300 text-slate-800 font-normal",
    primary: "bg-primary text-navy font-medium hover:bg-cream",
    dark: "bg-dark text-white font-medium hover:bg-accent",
    danger: "bg-red-500 text-white font-semibold",
    danger2: "bg-red-600/30 text-red-600",
  };
  const sizes = {
    small: "h-8 px-5 text-xs",
    medium: "h-10 px-5",
    large: "h-12 px-5",
  };
  return (
    <button
      type={type}
      className={twMerge(
        "rounded-md text-sm text-nowrap duration-150 hover:scale-96",
        disabled && "opacity-50 pointer-events-none",
        sizes[size],
        styles[style],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
