import { FC } from "react";
import BaseModal from "@/components/BaseModal";
import EmailIcon from "@/assets/svgs/email-icon.svg";

import Button from "@/components/Button";
import EagleCoins from "@/assets/svgs/eagle-coin-gray.svg";
import { useProfile } from "@/hooks/useProfile";

interface RedeemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const RedeemDetail: FC<RedeemDetailModalProps> = ({ isOpen, onClose, id }) => {
  const { data: profile } = useProfile({ enabled: false });
  const data = [
    {
      id: "1",
      title: "เเพ็กเก็จเที่ยวเชียงใหม่ตั๋วเครื่องบินไป-กลับ พร้อมที่พัก",
      description: `อย่าปล่อยให้หลุดมือเด็ดขาดไปเที่ยวเชียงใหม่จองผ่าน
      Air Asia SNAPคุ้มไม่ไหวจองเป็นคู่ถูกกว่าคุ้มกว่าจอง
      แยกกันอีกเพราะได้ทั้งตั๋ว เครื่องบินไป-กลับ + ที่พัก 3 วัน 2  คืนจ่ายคนละไม่ถึงพัน
          เริ่มต้นเพียง990บาทเท่านั้นไม่ต้องจองตั๋วเครื่องบิน
      กับที่พัก แยกกันให้เสียเวลาเลยแค่จองผ่านSNAP จบ
      ในที่เดียวแถมยังได้ดีลราคาพิเศษสุดๆ`,
      redeemDate: "01 May 2024",
      expired: "31 Jul 2024",
      total: 1,
      useCoins: 350,
      imageUrl:
        "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
    },
    {
      id: "2",
      title: "Passion Delivery",
      description: "ทดสอบ",
      redeemDate: "28 Apr 2024",
      expired: "31 Jul 2024",
      total: 2,
      useCoins: 200,
      imageUrl:
        "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
    },
    {
      id: "3",
      title: "แพ็คเกจทัวร์ กระบี่ ทดสอบ",
      description: "ทดสอบ",
      redeemDate: "08 Apr 2024",
      expired: "25 Jul 2024",
      total: 2,
      useCoins: 700,
      imageUrl:
        "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
    },
  ];
  const filteredData = data.filter((item) => item?.id === id);
  const email = !profile?.profile.username.includes("@")
    ? `${profile?.profile.username}@test.com`
    : profile?.profile.username;
  return (
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
                  className="w-full"
                />
                <div className="text-[#6A6A6A] font-bold py-5">
                  {item?.title}
                </div>
                <div className="text-[#6A6A6A] font-thin px-2">
                  {item?.description}
                </div>
              </div>
              <div>
                <div className=" font-thin py-2">กรุณากรอกอีเมลพนักงาน</div>
                <div className="relative">
                  <input
                    className="w-full border-b border-gray-400 focus:border-primary focus:outline-none pl-9 text-[#6A6A6A] opacity-70 "
                    type="text"
                    defaultValue={email}
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
              <div className="flex  items-center justify-between">
                <div className="">
                  <div className="my-2">
                    <div className=" flex gap-1 text-[#7A7B7B]">
                      Redeem date :{" "}
                      <p className=" text-blue-400">{item?.redeemDate}</p>
                    </div>
                    <div className=" flex  text-[#7A7B7B] gap-1">
                      Expired :<p className=" text-red-400">{item?.expired}</p>
                    </div>
                  </div>

                  <div className="font-bold">Total : {item?.total}</div>
                </div>

                <div className="relativ flex items-center justify-center">
                  <div className="item-center">
                    <div className="text-center text-[#7A7B7B]">Use coins</div>
                    <div className="flex text-center items-center font-bold text-xl text-[#7A7B7B] gap-1">
                      <img className="h-8" src={EagleCoins} alt="Eagle Coin" />
                      {item?.useCoins}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className=" w-36 mx-auto !py-2 text-primary !mt-6 rounded-full font-normal text-base"
                onClick={onClose}
                // disabled={shouldButtonDisabled}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ))}
    </BaseModal>
  );
};

export default RedeemDetail;
