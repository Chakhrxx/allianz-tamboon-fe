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
  const { data: profile, refetch: refetchProfile } = useProfile({
    enabled: false,
  });

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
    refetchProfile();
  };

  if (!profile) return null;

  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white h-full rounded-t-[38px]">
        <div className="relative border border-white   bg-[#ECF4F6] rounded-3xl drop-shadow-md h-full">
          <div className="relative z-10 flex items-start gap-4 pt-3 px-6 ">
            <div>
              <Avatar
                url={profile?.profile.profileImgUrl}
                onFileUpload={handleFileUpload}
              />
              <div className=" inline-flex text-center font-semibold text-[11px] mt-2 gap-1">
                ID : <p>{profile?.profile.id}</p>
              </div>
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
              <button
                className="flex button-with-icon px-4 py-1 bg-white rounded-full text-[#EDA740] gap-2 drop-shadow-md text-xs font-medium my-2 justify-center items-center"
                onClick={() => navigate("/redeem-history")}
              >
                <img
                  src={RedeemTicket}
                  className=" font-extralight"
                  alt="Ticket"
                />
                Redeem History
              </button>
            </div>
          </div>
          <div className="relative z-10 flex items-center justify-center gap-1 m-2 ">
            <img className=" w-[85px]" src={EagleCoins} alt="Eagle Coin" />
            <div>
              <div className="text-left font-extrabold text-[28px] text-[#EDA740] drop-shadow leading-none">
                {profile?.coins}
              </div>
              <div className=" text-left text-[#EDA740] text-2xl font-medium leading-none">
                {"Eagle coins"}
              </div>
            </div>
          </div>

          <div className="mx-auto bg-white w-[280px] h-[290px] px-14 pb-4 pt-2 rounded-xl shadow-lg flex flex-col items-center justify-center">
            <div className="font-bold pt-2 text-base">My QR code</div>
            <QRCode fgColor="#003781" value={qrValue} className="w-[208px]" />
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
        onRefresh={refetchProfile}
      />
      <ContactStaffModal
        isOpen={showContactStaffModal}
        onClose={() => setShowContactStaffModal(false)}
      />
    </>
  );
}

export default ProfilePage;
