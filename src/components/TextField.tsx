import classNames from "classnames";
import React from "react";
import { animated, useSpring } from "@react-spring/web";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
};

const TextField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const errorStyle = useSpring({
    opacity: props.error ? 1 : 0,
    transform: props.error ? "translateY(0)" : "translateY(-10px)",
  });
  return (
    <>
      <input
        ref={ref}
        {...props}
        className={classNames(
          "block p-2 rounded-full outline-none text-white bg-[#1E72B8]",
          props.className
        )}
      />
      <animated.small style={errorStyle} className="text-red-500 font-light">
        {props.error}
      </animated.small>
    </>
  );
});

export default TextField;
