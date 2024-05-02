import classNames from "classnames";
import { HTMLProps, forwardRef } from "react";

type Props = HTMLProps<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div>
        <input {...props} ref={ref} className="hidden peer" type="checkbox" />
        <label
          htmlFor={props.id}
          className={classNames(
            "block w-4 h-4 border-2 peer-checked:bg-primary ring-[1px] ring-primary transition-all rounded-sm",
            className
          )}
        ></label>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
