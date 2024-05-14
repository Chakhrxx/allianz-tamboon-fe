import { FC, useState } from "react";
import BaseModal from "@/components/BaseModal";
import EmailIcon from "@/assets/svgs/email-icon.svg";

import Button from "@/components/Button";
import EagleCoins from "@/assets/svgs/eagle-coin.svg";
import { useProfile } from "@/hooks/useProfile";
import SuccessModal from "./SuccessModal";

interface RedeemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const RedeemDetail: FC<RedeemDetailModalProps> = ({ isOpen, onClose, id }) => {
  const { data: profile } = useProfile({ enabled: false });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [counter, setCounter] = useState(1);
  const data = [
    {
      id: "1",
      title: "แพ็คเกจทัวร์ กระบี่ 3 วัน 2 คืน",
      descriptions: `เที่ยวหน้าหนาวกระบี่ ตั๋วเครื่องบินไป-กลับ พร้อมที่พัก 3 วัน 2
      คืนกับ Air Asia SNAP`,
      useCoins: 320,
      expired: "31 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      total: 4,
    },
    {
      id: "2",
      title: "Passion Delivery Gift Voucher. Value 1000 baht.",
      descriptions: `Passion Delivery gift vouchers are the perfect gift for any occasion.
      The recipient can choose from over 1500 products from 50+ shops.`,
      useCoins: 100,
      expired: "31 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
      total: 1,
    },
    {
      id: "3",
      title: "Wonka Chocolate Factory Personal lised Golden Ticket",
      descriptions: `This ticket gives every child a unique 
      adventure in Willy Wonka’s factory. In 
      Roald Dahl’s original,there were only five Golden Tickets in the whole world. 
      `,
      useCoins: 150,
      expired: "25 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
      total: 3,
    },
    {
      id: "4",
      title: "เเพ็กเก็จเที่ยวเชียงใหม่ ตั๋วเครื่องบินไป-กลับ พร้อมที่พัก",
      descriptions: `   เที่ยวหน้าหนาวเชียงใหม่ ตั๋วเครื่องบินไป-กลับ
      พร้อมที่พัก 3 วัน 2 คืนกับ AirAsia SNAP . 
      `,
      useCoins: 150,
      expired: "25 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
      total: 2,
    },
  ];
  const filteredData = data.filter((item) => item?.id === id);
  const email = !profile?.profile.username.includes("@")
    ? `${profile?.profile.username}@test.com`
    : profile?.profile.username;

  const openModal = () => {
    setShowSuccessModal(true);
    onClose();
  };
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        {filteredData.map((item) => (
          <div className="modal-body" key={item?.id}>
            <div className="w-full bg-white flex"></div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <img
                    src={item?.imageUrl}
                    alt="Image Label"
                    className="w-full rounded-t-xl"
                  />
                  <div className="flex  items-center justify-between my-4">
                    <div>
                      <div className=" text-lg  text-[#7A7B7B]">Expired</div>
                      <div className=" font-thin text-sm  text-[#7A7B7B]">
                        {item?.expired}
                      </div>
                    </div>

                    <div className="relativ flex items-center justify-center">
                      <div className="item-center">
                        <div className="flex  items-center  gap-1">
                          <img
                            className="w-10"
                            src={EagleCoins}
                            alt="Eagle Coin"
                          />
                          <div className="font-bold text-lg text-[#EDA23D] text-left drop-shadow-sm">
                            {item?.useCoins}
                            <div className="text-center text-[#EDA23D] text-xs font-thin">
                              Eagle Coins
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[#6A6A6A] font-bold pb-2">
                    {item?.title}
                  </div>
                  <div className="text-[#6A6A6A] font-thin px-2">
                    {item?.descriptions}
                  </div>
                </div>
                <div className=" px-16">
                  <div className=" font-thin py-2">กรุณากรอกอีเมลพนักงาน</div>
                  <div className="relative">
                    <input
                      className="w-full border-b border-gray-400 focus:border-primary focus:outline-none pl-9 text-[#6A6A6A] opacity-70 "
                      type="text"
                      defaultValue={email}
                      readOnly
                    />
                    <span className="absolute top-0 left-0 flex">
                      <img
                        src={EmailIcon}
                        alt="Email Icon"
                        className="fill-current text-[#6A6A6A] opacity-60"
                      />
                      <div className="fill-current text-[#6A6A6A] px-1 font-bold opacity-60">
                        :
                      </div>
                    </span>
                  </div>
                </div>
                <div className="flex justify-center space-x-2 mt-3">
                  <button
                    onClick={() => {
                      if (counter > 1) {
                        setCounter(counter - 1);
                      }
                    }}
                    className={`bg-primary text-white px-2 rounded-md text-base ${
                      counter === 1 ? "bg-[#E3E3E3]" : ""
                    }`}
                  >
                    -
                  </button>
                  <div className="bg-[#E3E3E3] text-[#5A4B43] rounded-md text-base w-12  text-center">
                    {counter}
                  </div>

                  <button
                    onClick={() => setCounter(counter + 1)}
                    className="bg-primary text-white px-2 rounded-md text-base"
                  >
                    +
                  </button>
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
        ))}
      </BaseModal>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default RedeemDetail;
