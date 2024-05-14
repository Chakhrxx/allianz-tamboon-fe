import { FC, useState } from "react";
import BaseModal from "@/components/BaseModal";
// import EmailIcon from "@/assets/svgs/email-icon.svg";

import Button from "@/components/Button";
// import EagleCoins from "@/assets/svgs/eagle-coin.svg";
import { useProfile } from "@/hooks/useProfile";
import SuccessModal from "./SuccessModal";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import Avatar from "../../profile/components/Avatar";
import { profileService } from "@/services/profile";
import { queryClient } from "@/libs/query-client";
import ProfileSettingsModal from "../../profile/components/ProfileSettingModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  total: number;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  id,
  total,
}) => {
  const { data: profile, refetch: refetchProfile } = useProfile({
    enabled: false,
  });
  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
    refetchProfile();
  };
  if (!profile) return null;
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        {filteredData.map((item) => (
          <div className="modal-body" key={item?.id}>
            <div className="p-4">
              <div className="space-y-3">
                <div className="relative z-10 flex text-center items-start gap-4 py-3 px-6 ">
                  <div>
                    <Avatar
                      url={profile?.profile.profileImgUrl}
                      onFileUpload={handleFileUpload}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-left">
                      {profile?.profile.displayName} &nbsp;
                      <BxEdit
                        className="inline-block w-4 h-4"
                        onClick={() => {
                          setShowProfileSettingsModal(true);
                        }}
                      />
                    </div>
                    <div className=" text-left text-sm font-normal">
                      {profile?.profile.username}
                    </div>
                    <div className=" text-left text-[11px] font-semibold ">
                      <span>ID :</span> <span>{profile?.profile.id}</span>
                    </div>
                  </div>
                </div>
                <div className="px-10">
                  <img
                    src={item?.imageUrl}
                    alt="Image Label"
                    className="w-full rounded-xl"
                  />
                  <div className="text-[#6A6A6A] font-bold  text-center pt-3 ">
                    คุณต้องการแลก
                  </div>
                  <div className=" font-medium pb-1 text-center pt-2 text-primary">
                    {item?.title}
                  </div>
                  <div className="text-center text-[#6A6A6A] font-medium">
                    จำนวน {total} ชิ้น{" "}
                    <span className="text-[#EDA23D]">
                      โดยใช้เหรียญทั้งหมด {item?.useCoins * total} เหรียญ
                    </span>
                  </div>
                </div>

                <div className="px-6">
                  <div className=" font-medium text-[#6A6A6A] text-center">
                    โดยทางเจ้าหน้าที่จะติดต่อกลับทาง
                    <br />
                    <p className=" text-primary underline">{email}</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    className=" w-24  !py-2 !text-primary !bg-white !my-4 rounded-full font-normal text-base border border-primary !normal-case"
                    onClick={onClose}
                  >
                    Back
                  </Button>
                  <Button
                    className=" w-24  !py-2  !my-4 rounded-full font-normal text-base border border-primary !normal-case"
                    onClick={() => openModal()}
                    variant="primary"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </BaseModal>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
        onRefresh={refetchProfile}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        id={id}
        total={total}
      />
    </>
  );
};

export default ConfirmModal;
