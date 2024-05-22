import { FC } from "react";
import BaseModal from "@/components/BaseModal";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { redeemService } from "@/services/redeem";

interface ContactStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  counter: number;
}

const SuccessModal: FC<ContactStaffModalProps> = ({
  isOpen,
  onClose,
  id,
  counter,
}) => {
  const navigate = useNavigate();
  const { data: reedeemOne } = useQuery(["redeem", id], () =>
    redeemService.getOne(id)
  );
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-white flex"></div>

        <div className="p-8" key={reedeemOne?.id}>
          <div className="text-center space-y-4">
            <div className=" font-normal  text-3xl">Your coins is Return</div>
            <img
              src={reedeemOne?.contentImage}
              alt=""
              className=" rounded-2xl"
            />
            <div className=" font-normal text-[#555555]">
              รายการของเเลกของรางวัลของคุณอนุมัติเรียบร้อย !
            </div>
            <div className="font-normal">{reedeemOne?.title}</div>
            <div className="text-center text-[#6A6A6A] font-normal">
              จำนวน {counter} ชิ้น
            </div>
            <div className="text-[#EDA23D] font-normal">
              โดยใช้เหรียญทั้งหมด {reedeemOne?.coins * counter} เหรียญ
            </div>
            <Button
              className="mx-auto !py-3  text-white !mt-6 font-normal !text-lg rounded-full"
              onClick={() => {
                onClose();
                navigate("/redeem");
              }}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default SuccessModal;
