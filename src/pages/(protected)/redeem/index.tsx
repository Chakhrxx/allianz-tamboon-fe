import EagleCoins from "@/assets/svgs/eagle-coin.svg";
import Coupon from "@/assets/svgs/Coupon.svg";
import { useProfile } from "@/hooks/useProfile";
import RedeemModal from "./components/RedeemModal";
import { useState } from "react";
function RedeemPage() {
  const [showRedeemDetailModal, setShowRedeemDetailModal] = useState(false);
  const [showId, setShowId] = useState("");
  const { data: profile } = useProfile({ enabled: false });

  const openModal = (id: string) => {
    setShowRedeemDetailModal(true);
    setShowId(id);
  };
  const data = [
    {
      id: "1",
      title: "แพ็คเกจทัวร์ กระบี่ 3 วัน 2 คืน",
      descriptions: `เที่ยวหน้าหนาวกระบี่ ตั๋วเครื่องบินไป-กลับ พร้อมที่พัก 3 วัน 2
      คืนกับ Air Asia SNAP`,
      useCoins: 320,
      imageUrl:
        "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
    },
    {
      id: "2",
      title: "Passion Delivery Gift Voucher. Value 1000 baht.",
      descriptions: `Passion Delivery gift vouchers are the perfect gift for any occasion.
      The recipient can choose from over 1500 products from 50+ shops.`,
      useCoins: 100,
      imageUrl:
        "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
    },
    {
      id: "3",
      title: "Wonka Chocolate Factory Personal lised Golden Ticket",
      descriptions: `This ticket gives every child a unique 
      adventure in Willy Wonka’s factory. In 
      Roald Dahl’s original,there were only five Golden Tickets in the whole world. 
      `,
      useCoins: 150,
      imageUrl:
        "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
    },
    {
      id: "4",
      title: "เเพ็กเก็จเที่ยวเชียงใหม่ ตั๋วเครื่องบินไป-กลับ พร้อมที่พัก",
      descriptions: `   เที่ยวหน้าหนาวเชียงใหม่ ตั๋วเครื่องบินไป-กลับ
      พร้อมที่พัก 3 วัน 2 คืนกับ AirAsia SNAP . 
      `,
      useCoins: 150,
      imageUrl:
        "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
    },
  ];
  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white rounded-t-[38px]">
        <div className=" relative">
          <img
            src={Coupon}
            alt=""
            className="w-full h-[210px] object-cover mx-auto rounded-2xl"
          />
          <div className=" absolute flex bottom-0 right-0 rounded-tl-xl bg-[#FAEDA2] drop-shadow-2xl px-6 py-1 items-center h-[46px]">
            <img src={EagleCoins} alt="" className="w-10" />
            <div className="text-[#EDA23D] drop-shadow-sm font-semibold text-xl leading-none">
              350
              <p className="text-[#EDA23D] font-extralight text-sm drop-shadow-sm leading-none">
                eagle coins
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center text-center p-1 bg-gradient-to-r from-[#7DD1E8] from-22% to-[#19A2DE] to-84% rounded-b-[38px] drop-shadow-lg items-center gap-2 mx-auto w-3/4">
          <img src={EagleCoins} alt="" className="w-12" />
          <p className="text-white font-semibold text-lg drop-shadow-sm gap-2">
            You have {profile?.coins} coins
          </p>
        </div>
        <div className="font-semibold text-lg text-left mt-4  drop-shadow-md">
          All Rewards
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {data.map((item) => (
            <div onClick={() => openModal(item?.id)} key={item?.id}>
              <div className=" relative  my-2 rounded-2xl drop-shadow-2xl h-full ">
                <div className=" relative">
                  <img
                    src={item?.imageUrl}
                    alt=""
                    className="rounded-t-2xl border-b-0 border-[3px] border-white"
                  />
                  <div className=" absolute flex bottom-0 right-0 rounded-tl-xl bg-[#FAEDA2] drop-shadow-2xl px-2 items-center">
                    <img src={EagleCoins} alt="" className="w-6" />
                    <div className="text-[#EDA23D] drop-shadow-sm font-semibold text-base leading-none py-1">
                      {item?.useCoins}
                      <p className="text-[#EDA23D] font-extralight text-xs drop-shadow-sm leading-none ">
                        eagle coins
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative bg-white px-3 py-2 h-[120px]">
                  <p className="font-semibold text-sm text-left pb-2 text-black">
                    {item?.title?.length > 40
                      ? `${item?.title.substring(0, 40)}...`
                      : item?.title}
                  </p>
                  <p className=" text-xs text-left font-thin indent-4 text-black">
                    {item?.descriptions?.length > 50
                      ? `${item?.descriptions.substring(0, 50)}...`
                      : item?.descriptions}
                  </p>
                </div>
                <div className="relative flex justify-center text-center p-1 bg-gradient-to-r from-[#7DD1E8] from-22% to-[#19A2DE] to-84% rounded-b-xl drop-shadow-lg items-center">
                  <p className="text-white font-bold text-lg drop-shadow-sm gap-1">
                    Redeem
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RedeemModal
        id={showId}
        isOpen={showRedeemDetailModal}
        onClose={() => setShowRedeemDetailModal(false)}
      />
    </>
  );
}

export default RedeemPage;
