import classNames from "classnames";
import { FC, ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
};

const BaseModal: FC<ModalProps> = ({
  isOpen,
  className,
  onClose,
  children,
}) => {
  const modalClasses = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
    : "hidden";

  return (
    <div className={modalClasses}>
      <div
        className="absolute inset-0 bg-[#ECF4F6] opacity-95"
        onClick={onClose}
      ></div>
      <div
        className={classNames(
          "bg-white w-11/12 md:max-w-md mx-auto rounded-xl shadow  shadow-[#7EA6F4]  z-50 overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
