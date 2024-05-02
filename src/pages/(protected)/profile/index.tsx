import { useProfile } from "@/hooks/useProfile";
import { useMemo, useState } from "react";
import QRCode from "react-qr-code";
import Avatar from "./components/Avatar";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import EagleCoins from "@/assets/svgs/eagle-coin.svg";
import RedeemTicket from "@/assets/svgs/redeem-ticket.svg";
import ContactStaff from "@/assets/svgs/customer-service.svg";
import ProfileSettingsModal from "./components/ProfileSettingModal";
import ContactStaffModal from "./components/ContactStaffModal";
import { queryClient } from "@/libs/query-client";
import { profileService } from "@/services/profile";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const [showContactStaffModal, setShowContactStaffModal] = useState(false);
  const { data: profile } = useProfile({ enabled: false });

  const qrValue = useMemo(() => {
    return JSON.stringify({
      id: profile?.profile.id,
      displayName: profile?.profile.displayName,
      username: profile?.profile.username,
      branchId: profile?.profile.branchId,
    });
  }, [profile]);

  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
  };

  if (!profile) return null;

  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white h-full rounded-t-[38px]">
        <div className="relative border border-white   bg-[#ECF4F6] rounded-3xl drop-shadow-md h-full">
          <div className="relative z-10 flex items-center gap-4 pt-3 px-6 ">
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
              <div className="font-bold text-xl text-left">
                {profile?.profile.displayName}
                <BxEdit
                  className="inline-block"
                  onClick={() => setShowProfileSettingsModal(true)}
                />
              </div>
              <div className=" text-left">{profile?.profile.username}</div>
              <button
                className="flex button-with-icon px-4 py-1 bg-white rounded-full text-[#EDA740] gap-2 drop-shadow-md text-md my-2"
                onClick={() => navigate("/redeem-history")}
              >
                <img src={RedeemTicket} className="" alt="Ticket" />
                Redeem History
              </button>
            </div>
          </div>
          <div className="relative z-10 flex items-center justify-center gap-2 m-2 ">
            <img className=" w-16" src={EagleCoins} alt="Eagle Coin" />
            <div>
              <div className="text-left font-bold text-3xl text-[#EDA740] drop-shadow">
                {profile?.coins}
              </div>
              <div className=" text-left text-[#EDA740]">{"Eagle coins"}</div>
            </div>
          </div>

          <div className=" bg-white w-fit mx-auto px-14 pb-8  rounded-xl shadow-lg">
            <div className="font-bold py-2 text-xl">My QR code</div>
            <QRCode
              fgColor="#003781"
              value={qrValue}
              className=" h-56 w-full"
            />
          </div>
          <div className=" flex justify-end p-4 ">
            <div onClick={() => setShowContactStaffModal(true)}>
              <img className="mx-auto" src={ContactStaff} alt="Contact staff" />
              <div className=" text-xs font-bold">{"Contact staff"}</div>
            </div>
          </div>
        </div>
      </div>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
      />
      <ContactStaffModal
        isOpen={showContactStaffModal}
        onClose={() => setShowContactStaffModal(false)}
      />
    </>
  );
}

export default ProfilePage;
