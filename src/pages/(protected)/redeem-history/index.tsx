import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import Avatar from "../profile/components/Avatar";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import ProfileSettingsModal from "../profile/components/ProfileSettingModal";
import RedeemModal from "./components/RedeemModal";
import { queryClient } from "@/libs/query-client";
import { profileService } from "@/services/profile";
import EagleCoins from "@/assets/images/eaglecoin 3.png";
import BackArrowIcon from "@/assets/svgs/BackArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { requestRedeemService } from "@/services/request-redeem";

function RedeemHistoryPage() {
  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const [showRedeemDetailModal, setShowRedeemDetailModal] = useState(false);
  const [showId, setShowId] = useState("");
  const { data: profile, refetch: refetchProfile } = useProfile({
    enabled: false,
  });
  const { data: requestRedeem } = useQuery(
    ["requestRedeem", profile?.profile.id],
    () => requestRedeemService.getByUserId(profile?.profile.id ?? 0)
  );

  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
  };

  const openModal = (id: string) => {
    setShowRedeemDetailModal(true);
    setShowId(id);
  };

  if (!profile) return null;
  if (!requestRedeem) return null;
  console.log("requestRedeem", requestRedeem);

  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white rounded-t-[38px]">
        <div className="relative rounded-3xl drop-shadow-md ">
          <div className="relative z-10 flex items-start gap-4 ">
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
                  onClick={() => setShowProfileSettingsModal(true)}
                />
              </div>
              <div className=" text-left text-sm font-normal">
                {profile?.profile.username}
              </div>
            </div>
          </div>
          <div className=" text-left text-lg font-bold py-2">History</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {requestRedeem.map((item) => (
              <div
                className="bg-[#ECF4F6] shadow-md px-4 mb-1 py-2 rounded-2xl w-full text-left"
                key={item?.id}
              >
                <div className="flex  items-center">
                  <img
                    src={item?.redeem?.coverImage}
                    alt="Image Label"
                    className=" max-w-28 h-24"
                  />
                  <div className="px-4 py-2">
                    <div className=" text-sm font-medium leading-5  break-words w-25 pr-10 ">
                      {item?.redeem?.title}
                    </div>
                    <div className="my-2">
                      <div className="font-medium flex gap-1 text-[9px]  text-gray-500">
                        Redeem date :{" "}
                        <p className="text-[9px] font-medium text-blue-400">
                          {new Date(item?.created).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="font-medium flex text-[9px]  text-gray-500 gap-1">
                        Expired :
                        <p className="font-medium text-[9px] text-red-400">
                          {new Date(
                            item?.redeem?.expiredDate
                          ).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            // hour: "2-digit",
                            // minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="font-medium  text-[10px]">
                      Total : {item?.total}
                    </div>
                  </div>

                  <div className="absolute z-10 flex items-center justify-center right-0 mr-2">
                    <div className="item-center">
                      <div className="text-center text-[#7A7B7B] text-[10px] justify-center">
                        Use coins
                      </div>
                      <div className="flex text-center items-center font-semibold text-lg text-[#7A7B7B] gap-1">
                        <img
                          className="h-8"
                          src={EagleCoins}
                          alt="Eagle Coin"
                        />
                        {item?.redeem?.coins * item?.total}
                      </div>
                      <button
                        className="bg-white py-1 px-4 mx-auto mt-4 rounded-full border-2 border-primary text-[10px] font-medium"
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
          <button className="mt-4" onClick={() => navigate("/profile")}>
            <img src={BackArrowIcon} alt="" className=" w-14 h-14" />
          </button>
        </div>
      </div>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
        onRefresh={refetchProfile}
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
