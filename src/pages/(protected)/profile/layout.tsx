import Avatar from "./components/Avatar";
import BgCircleImage from "@/assets/images/bg-circle.png";

import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import { Outlet, useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { profileService } from "@/services/profile";
import { queryClient } from "@/libs/query-client";
import ProfileSettingsModal from "./components/ProfileSettingModal";
import { useState } from "react";
import LogoutConfirmOverlay from "./components/LogoutConfirmOverlay";
import Banner from "@/components/Banner";

function ProfileLayout() {
  const navigate = useNavigate();
  const [showLogoutConfirmOverlay, setShowLogoutConfirmOverlay] =
    useState(false);
  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const { data: profile } = useProfile({ enabled: false });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };

  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
  };

  if (!profile) return null;

  return (
    <>
      <Banner />
      <div className="relative px-8 h-full">
        <div className="relative z-10 flex items-center gap-4">
          <Avatar
            url={profile?.profile.profileImgUrl}
            onFileUpload={handleFileUpload}
          />
          <div>
            <div className="font-bold text-xl">
              {profile?.profile.displayName}{" "}
              <BxEdit
                className="inline-block"
                onClick={() => setShowProfileSettingsModal(true)}
              />
            </div>
            <div>{profile?.profile.username}</div>
          </div>
        </div>
        <button
          className="relative underline underline-offset-2 ml-4 my-3 z-10"
          onClick={() => setShowLogoutConfirmOverlay(true)}
        >
          Logout
        </button>
        <Outlet />
        <img
          className="absolute left-0 -bottom-10 w-full"
          src={BgCircleImage}
          alt="Circle Image"
        />
      </div>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
      />
      <LogoutConfirmOverlay
        show={showLogoutConfirmOverlay}
        onConfirm={logout}
        onBack={() => setShowLogoutConfirmOverlay(false)}
      />
    </>
  );
}

export default ProfileLayout;
