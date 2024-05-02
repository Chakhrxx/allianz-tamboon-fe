import { FC } from "react";
import BaseModal from "@/components/BaseModal";
import { useProfile } from "@/hooks/useProfile";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import CloseIcon from "@/assets/svgs/close-icon.svg";

interface ContactStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactStaffModal: FC<ContactStaffModalProps> = ({ isOpen, onClose }) => {
  const { data: profile } = useProfile({ enabled: false });

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-white flex"></div>
        <div className="p-6">
          <div className=" relative">
            <div className="flex justify-end relative mb-0">
              <button
                className=" underline underline-offset-2 text-[16px]"
                onClick={onClose}
              >
                <img src={CloseIcon} alt="" />
              </button>
            </div>
            <h1 className="relative  font-extrabold text-3xl text-center pb-2">
              Contact staff
            </h1>
          </div>
          <div className="space-y-3">
            <div>Detail</div>
            <TextField
              // {...register('name')}
              className="w-full bg-[#D9D9D9] rounded-xl h-36 text-[#404040] cursor-text"
              // error={errors.name?.message}
            />
            <div>Employee E-mail</div>
            <TextField
              // {...register('name')}
              className="w-full bg-[#D9D9D9] rounded-xl text-[#404040] opacity-70"
              value={
                !profile?.profile.username.includes("@")
                  ? `${profile?.profile.username}@test.com`
                  : profile?.profile.username
              }
              readOnly
              // error={errors.name?.message}
            />
            <Button
              className=" w-36 mx-auto !py-2 text-primary !mt-6 font-normal text-base"
              // onClick={() => navigate("/redeem-history")}
              // disabled={shouldButtonDisabled}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ContactStaffModal;
