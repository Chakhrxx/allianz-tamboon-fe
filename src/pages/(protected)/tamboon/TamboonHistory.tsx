import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../profile/components/Avatar";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import { useProfile } from "@/hooks/useProfile";
import { queryClient } from "@/libs/query-client";
import { profileService } from "@/services/profile";
import ProfileSettingsModal from "../profile/components/ProfileSettingModal";
import { useQuery } from "react-query";
import { requestTamboonService } from "@/services/request-tamboon";

function TamboonHistory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const { data: profile, refetch: refreshProfile } = useProfile({
    enabled: false,
  });

  const { data: tamboon } = useQuery(
    ["requestTamboon", profile?.profile.id],
    () => requestTamboonService.getOne(id ?? "")
  );

  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
  };

  if (!profile) return null;
  if (!tamboon) return null;

  return (
    <>
      <div className="relative  text-center p-6 bg-white rounded-t-[38px]">
        <div className="relative z-10 flex items-start gap-4 mb-4 ">
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
        <div className="relative  bg-[#ECF4F6] rounded-3xl drop-shadow-sm h-full mx-2">
          <div
            className=" shadow-md  rounded-2xl w-full text-left px-8 py-4"
            key={tamboon?.id}
          >
            <div className="relative z-10 text-center">
              <p className="text-2xl font-medium mb-2 drop-shadow-sm">
                {tamboon?.tamboon?.activityName}
              </p>
              <p className="text-left font-medium text-sm mb-2 drop-shadow-sm">
                {tamboon?.tamboon?.description}
              </p>
              <p className="text-lg  font-medium mb-2 drop-shadow-sm">
                {"หลักฐานการทำความดี"}
              </p>
              <img
                src={tamboon.uploadImage}
                alt="Uploaded Image"
                className="py-2 max-h-[250px] object-contain"
              />

              <div className=" flex text-left font-bold text-sm mt-2 gap-1">
                Activity :{" "}
                <p className=" font-normal">
                  {" "}
                  {tamboon?.tamboon?.activityName}
                </p>
              </div>
              <div className=" flex text-left font-bold text-sm mt-2 gap-1">
                Date :{" "}
                <p className=" font-normal">
                  {new Date(tamboon?.created).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className=" flex text-left font-bold text-sm mt-2 gap-1">
                Status : <p className=" font-normal"> {tamboon?.status}</p>
              </div>
              {tamboon?.rejectDetail && (
                <div className=" flex text-left font-bold text-sm mt-2 gap-1 text-red-400">
                  <p className=" font-normal">{tamboon?.rejectDetail}</p>
                </div>
              )}
              {tamboon?.acceptDetail && (
                <div className=" flex text-left font-bold text-sm mt-2 gap-1 text-green-400">
                  <p className=" font-normal">{tamboon?.acceptDetail}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative space-x-4 items-center my-6">
          <button
            className="bg-white py-2 px-6 rounded-full border border-1 border-primary text-sm"
            onClick={() => navigate("/csr")}
          >
            Back
          </button>
        </div>
      </div>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
        onRefresh={refreshProfile}
      />
    </>
  );
}

export default TamboonHistory;
