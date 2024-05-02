import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import Avatar from "./components/Avatar";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import ProfileSettingsModal from "./components/ProfileSettingModal";
import RedeemModal from "./components/RedeemModal";
import { queryClient } from "@/libs/query-client";
import { profileService } from "@/services/profile";
import EagleCoins from "@/assets/svgs/eagle-coin-gray.svg";

function RedeemHistoryPage() {
  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const [showRedeemDetailModal, setShowRedeemDetailModal] = useState(false);
  const [showId, setShowId] = useState("");
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
      description: "",
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
      description: "",
      redeemDate: "08 Apr 2024",
      expired: "25 Jul 2024",
      total: 2,
      useCoins: 700,
      imageUrl:
        "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
    },
  ];

  const truncatedData = data.map((item) => {
    const [first, second] = item.title.split(" ");
    const title = `${first} ${second}`;
    return {
      ...item,
      title:
        title.length > 25 ? `${title.substring(0, 24)} ...` : `${title} ...`,
    };
  });

  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
  };

  const openModal = (id: string) => {
    setShowRedeemDetailModal(true);
    setShowId(id);
  };

  if (!profile) return null;

  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white h-full rounded-t-[38px]">
        <div className="relative rounded-3xl drop-shadow-md h-full">
          <div className="relative z-10 flex items-center gap-4 ">
            <div>
              <Avatar
                url={profile?.profile.profileImgUrl}
                onFileUpload={handleFileUpload}
              />
              <div className=" inline-flex text-center font-bold text-xs mt-2 gap-1">
                ID : <p>{profile?.profile.id}</p>
              </div>
            </div>

            <div>
              <div className="font-bold text-xl text-left items-center">
                {profile?.profile.displayName}
                <BxEdit
                  className="inline-block"
                  onClick={() => setShowProfileSettingsModal(true)}
                />
              </div>
              <div className=" text-left">{profile?.profile.username}</div>
            </div>
          </div>
          <div className=" text-left text-md font-bold py-2">History</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {truncatedData.map((item) => (
              <div
                className="bg-[#ECF4F6] shadow-md px-4 mb-1 py-2 rounded-2xl w-full text-left"
                key={item?.id}
              >
                <div className="flex  items-center">
                  <img
                    src={item?.imageUrl}
                    alt="Image Label"
                    className=" max-w-28 h-24"
                  />
                  <div className="px-4 py-2">
                    <div className=" text-base font-bold font-inter">
                      {item?.title}
                    </div>
                    <div className="my-2">
                      <div className=" flex gap-1 text-xs font-inter text-gray-500">
                        Redeem date :{" "}
                        <p className="text-xs text-blue-400">
                          {item?.redeemDate}
                        </p>
                      </div>
                      <div className=" flex text-xs font-inter text-gray-500 gap-1">
                        Expired :
                        <p className="text-xs text-red-400">{item?.expired}</p>
                      </div>
                    </div>

                    <div className="font-bold  text-sm">
                      Total : {item?.total}
                    </div>
                  </div>

                  <div className="absolute z-10 flex items-center justify-center right-0 mr-2">
                    <div className="item-center">
                      <div className="text-center text-[#7A7B7B]">
                        Use coins
                      </div>
                      <div className="flex text-center items-center font-bold text-xl text-[#7A7B7B] gap-1">
                        <img
                          className="h-8"
                          src={EagleCoins}
                          alt="Eagle Coin"
                        />
                        {item?.useCoins}
                      </div>
                      <button
                        className="bg-white py-1 px-4 mx-auto mt-4 rounded-full border-2 border-primary text-sm"
                        onClick={() => openModal(item?.id)}
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
      />
      <RedeemModal
        id={showId}
        isOpen={showRedeemDetailModal}
        onClose={() => setShowRedeemDetailModal(false)}
      />
    </>
  );
}

export default RedeemHistoryPage;
