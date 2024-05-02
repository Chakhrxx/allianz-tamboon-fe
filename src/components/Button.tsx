import classNames from "classnames";
import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "light"
  | "violet";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: ButtonVariant;
};

const buttonVariantClassNames = {
  primary: "bg-primary text-white hover:bg-blue-600",
  violet: "bg-[#4A4DE7] text-white hover:bg-[#4A4DE7] hover:bg-opacity-50",
  secondary: "bg-gray-500 text-white",
  danger: "bg-red-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-[#F8AE17] text-primary",
  info: "bg-blue-500 text-white",
  light: "bg-[#AFB1B6] text-white",
};

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const variant = props.variant ?? "primary";
  const buttonStyle = buttonVariantClassNames[variant];

  return (
    <button
      ref={ref}
      {...props}
      className={classNames(
        "block min-w-32 py-4 rounded uppercase font-semibold transition-all duration-300 disabled:bg-[#EFEFF0] disabled:text-[#A5A8AF]",
        buttonStyle,
        props.className
      )}
    >
      {props.children}
    </button>
  );
});

export default Button;
