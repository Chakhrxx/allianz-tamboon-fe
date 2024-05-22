import { FC, useState } from "react";
import BaseModal from "@/components/BaseModal";
import EmailIcon from "@/assets/svgs/email-icon.svg";

import Button from "@/components/Button";
import EagleCoins from "@/assets/images/eaglecoin 4.png";
import { useProfile } from "@/hooks/useProfile";
import ConfirmModal from "./ConfirmModal";
import { useQuery } from "react-query";
import { redeemService } from "@/services/redeem";
// import { useParams } from "react-router-dom";

interface RedeemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const RedeemDetail: FC<RedeemDetailModalProps> = ({ isOpen, onClose, id }) => {
  // const { id } = useParams();
  const { data: profile } = useProfile({ enabled: false });
  const { data: reedeemOne } = useQuery(["redeem", id], () =>
    redeemService.getOne(id)
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [counter, setCounter] = useState(1);
  const email = !profile?.profile.username.includes("@")
    ? `${profile?.profile.username}@test.com`
    : profile?.profile.username;

  const openModal = () => {
    setShowSuccessModal(true);
    // onClose();
  };

  if (!reedeemOne) return null;
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className="modal-body" key={reedeemOne?.id}>
          <div className="w-full bg-white flex"></div>
          <div className="p-6">
            <div className="space-y-3">
              <div>
                <img
                  src={reedeemOne?.contentImage}
                  alt="Image Label"
                  className="w-full rounded-t-xl"
                />
                <div className="flex  items-center justify-between my-4">
                  <div>
                    <div className=" text-lg  text-[#5A4B43]">Expired</div>
                    <div className=" font-normal text-sm  text-[#5A4B43]">
                      {new Date(reedeemOne?.expiredDate).toLocaleDateString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>

                  <div className="relativ flex items-center justify-center">
                    <div className="reedeemOne-center">
                      <div className="flex  items-center  gap-1">
                        <img
                          className="w-10"
                          src={EagleCoins}
                          alt="Eagle Coin"
                        />
                        <div className="font-bold text-lg text-[#EDA23D] text-left drop-shadow-sm">
                          {reedeemOne?.coins}
                          <div className="text-center text-[#EDA23D] text-[14px] font-normal leading-none">
                            Eagle Coins
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[#5A4B43] font-bold pb-2">
                  {reedeemOne?.title}
                </div>
                <div className="text-[#5A4B43] font-normal px-2">
                  {reedeemOne?.description}
                </div>
              </div>
              <div className=" px-16">
                <div className=" font-normal py-2">กรุณากรอกอีเมลพนักงาน</div>
                <div className="relative">
                  <input
                    className="w-full border-b rounded-none border-gray-400 focus:border-primary focus:outline-none pl-9 text-[#6A6A6A] opacity-70 "
                    type="text"
                    defaultValue={email}
                    readOnly
                  />
                  <span className="absolute top-0 left-0 flex">
                    <img
                      src={EmailIcon}
                      alt="Email Icon"
                      className="fill-current text-[#5A4B43] opacity-60"
                    />
                    <div className="fill-current text-[#5A4B43] px-1 font-bold opacity-60">
                      :
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex justify-center space-x-2 py-3">
                <button
                  onClick={() => {
                    if (counter > 1) {
                      setCounter(counter - 1);
                    }
                  }}
                  className={` text-white px-2 rounded-md text-base ${
                    counter > 1 ? "bg-primary " : "bg-[#E3E3E3]"
                  }`}
                >
                  -
                </button>
                <div className="bg-[#E3E3E3] text-[#5A4B43] rounded-md text-base w-12  text-center">
                  {counter}
                </div>
                <button
                  onClick={() => {
                    if (profile?.coins > counter * reedeemOne?.coins) {
                      setCounter(counter + 1);
                      console.log("Total Coins", counter * reedeemOne?.coins);
                      console.log("My Coins", profile?.coins);
                    }
                  }}
                  className={` text-white px-2 rounded-md text-base ${
                    counter < reedeemOne?.total &&
                    profile?.coins > counter * reedeemOne?.coins
                      ? "bg-primary"
                      : "bg-[#E3E3E3]"
                  }`}
                >
                  +
                </button>
                {/* 
                <button
                  onClick={() => setCounter(counter + 1)}
                  className="bg-primary text-white px-2 rounded-md text-base"
                >
                  +
                </button> */}
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  className=" w-36  !py-2 !text-primary !bg-white !mt-4 rounded-full font-normal text-base border border-primary !normal-case"
                  onClick={onClose}
                >
                  Back
                </Button>
                <Button
                  className=" w-36  !py-2  !mt-4 rounded-full font-normal text-base border border-primary !normal-case"
                  onClick={() => openModal()}
                  variant="primary"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BaseModal>
      {showSuccessModal && (
        <ConfirmModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          id={id}
          total={counter}
        />
      )}
    </>
  );
};

export default RedeemDetail;
