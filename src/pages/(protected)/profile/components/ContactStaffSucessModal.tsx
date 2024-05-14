import { FC } from "react";
import BaseModal from "@/components/BaseModal";
import Button from "@/components/Button";
import ContactStaffSuccess from "@/assets/svgs/contactStaffSuccess.svg";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-white flex"></div>
        <div className="p-6">
          <div className=" relative">
            <div className="justify-center items-center relative mb-0">
              <img
                src={ContactStaffSuccess}
                alt=""
                className="w-[82px] mx-auto py-4"
              />
              <p className="relative  font-semibold text-[18px] text-center pb-2">
                อัพโหลดสำเร็จ !
              </p>
              <p className="relative font-medium text-[18px] text-center pb-2">
                กรุณารอการตอบกลับจากเจ้าหน้าที่
              </p>
            </div>
          </div>
          <Button
            className=" w-[85px] mx-auto !py-3 !bg-primary text-primary !mt-4 font-normal text-base rounded-full !normal-case"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default SuccessModal;
