import { FC, useState } from "react";
import BaseModal from "@/components/BaseModal";
import EmailIcon from "@/assets/svgs/email-icon.svg";

import Button from "@/components/Button";
import EagleCoins from "@/assets/images/eaglecoin 4.png";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "react-query";
import { redeemService } from "@/services/redeem";
import { useNavigate, useParams } from "react-router-dom";

interface RedeemDetailModalProps {
  isOpen: boolean;
}

const RedeemDetail: FC<RedeemDetailModalProps> = ({ isOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: profile } = useProfile({ enabled: false });
  const { data: reedeemOne } = useQuery(["redeem", id], () =>
    redeemService.getOne(id ?? "")
  );
  const [counter, setCounter] = useState<number>(1);
  const email = !profile?.profile.username.includes("@")
    ? `${profile?.profile.username}@test.com`
    : profile?.profile.username;
  if (!profile) return null;
  if (!reedeemOne) return null;

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={() => navigate("/redeem")}>
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
                    <div className=" text-lg    ">Expired</div>
                    <div className=" font-normal text-sm  text-[#546A87]  ">
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
                <div className=" font-bold pb-2">{reedeemOne?.title}</div>
                <div className=" font-normal px-2 text-[#546A87]">
                  {reedeemOne?.description}
                </div>
              </div>
              <div className=" px-16">
                <div className=" font-normal py-2">กรุณากรอกอีเมลพนักงาน</div>
                <div className="relative">
                  <input
                    className="w-full border-b rounded-none border-gray-400 focus:border-primary focus:outline-none pl-9   text-[#546A87]  "
                    type="text"
                    defaultValue={email}
                    readOnly
                  />
                  <span className="absolute top-0 left-0 flex">
                    <img
                      src={EmailIcon}
                      alt="Email Icon"
                      className="fill-current w-[20px]  opacity-60"
                    />
                    <div className="fill-current   text-[#546A87]  px-1 font-bold ">
                      :
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex justify-center space-x-2 pt-3">
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
                <div className="bg-[#E3E3E3]  text-[#546A87 rounded-md text-base w-12  text-center">
                  {counter}
                </div>
                <button
                  onClick={() => {
                    if (
                      counter < reedeemOne?.total &&
                      profile?.coins > counter * reedeemOne?.coins
                    ) {
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
              </div>
              <div className="flex justify-center space-x-2">
                {profile?.coins < counter * reedeemOne?.coins ? (
                  <div className="text-red-400">
                    Sorry, Your coins is not enough.
                  </div>
                ) : counter >= reedeemOne?.total &&
                  profile?.coins > counter * reedeemOne?.coins ? (
                  <div className="text-primary">
                    Sorry, there are not enough rewards.
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  className=" w-36  !py-2 !text-primary !bg-white !mt-4 rounded-full font-normal text-base border border-primary !normal-case"
                  onClick={() => navigate(`/redeem`)}
                >
                  Back
                </Button>
                {profile?.coins > counter * reedeemOne?.coins && (
                  <Button
                    className=" w-36  !py-2  !mt-4 rounded-full font-normal text-base border border-primary !normal-case"
                    onClick={() => {
                      if (profile?.coins > counter * reedeemOne?.coins) {
                        navigate(
                          `/redeem/confirm/${reedeemOne?.id}?total=${counter}`
                        );
                      }
                    }}
                    variant="primary"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default RedeemDetail;
