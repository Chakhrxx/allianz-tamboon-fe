import { FC } from "react";
import BaseModal from "@/components/BaseModal";
import Button from "@/components/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { redeemService } from "@/services/redeem";
import SuccesssIcon from "@/assets/svgs/upload-success.svg";

interface ContactStaffModalProps {
  isOpen: boolean;
}

const RedeemSuccessModal: FC<ContactStaffModalProps> = ({ isOpen }) => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const counter = searchParams.get("counter");
  const navigate = useNavigate();
  const { data: reedeemOne } = useQuery(["redeem", id], () =>
    redeemService.getOne(id ?? "")
  );
  return (
    <BaseModal isOpen={isOpen} onClose={() => navigate("/redeem")}>
      <div className="modal-body">
        <div className="w-full bg-white flex"></div>

        <div className="p-8" key={reedeemOne?.id}>
          <div className="text-center space-y-6">
            <div className=" font-normal  text-3xl">Successfully !</div>
            <img src={SuccesssIcon} alt="" className=" mx-auto w-32" />

            <div className="font-normal">
              The assigned coordinator will keep you posted on the outcome
              thereafter.
            </div>

            <Button
              className="mx-auto !py-2  text-white !mt-6 font-normal !text-lg rounded-full"
              onClick={() => {
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

export default RedeemSuccessModal;
