import { FC } from "react";
import BaseModal from "@/components/BaseModal";
import Button from "@/components/Button";
import SuccesssIcon from "@/assets/svgs/upload-success.svg";

interface ContactStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<ContactStaffModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-white flex"></div>

        <div className="p-6">
          <img src={SuccesssIcon} className="mx-auto py-4" />
          <div className="text-center">
            <div className=" font-bold">Request successfully !</div>
            <div>กรุณารอการตรวจสอบจากเจ้าหน้าที่</div>
            <Button
              className="mx-auto !py-2 text-white !mt-6 font-normal text-base rounded-full"
              variant="danger"
              onClick={onClose}
              // disabled={shouldButtonDisabled}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default SuccessModal;
