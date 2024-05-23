import BgMainImage from "@/assets/svgs/Tambbon-bg-header.svg";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutConfirmOverlay from "./components/LogoutConfirmOverlay";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { queryClient } from "@/libs/query-client";

function RedeemLayout() {
  const navigate = useNavigate();
  const [showLogoutConfirmOverlay, setShowLogoutConfirmOverlay] =
    useState(false);
  const { data: profile } = useProfile({ enabled: false });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };

  if (!profile) return null;
  return (
    <>
      <div className="relative">
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2  w-full"
          src={BgMainImage}
          alt="Main background"
        />
        <h1 className="relative text-white font-extrabold text-[28px] text-center py-4">
          Reward
        </h1>

        <Outlet />
      </div>
      <LogoutConfirmOverlay
        show={showLogoutConfirmOverlay}
        onConfirm={logout}
        onBack={() => setShowLogoutConfirmOverlay(false)}
      />
    </>
  );
}

export default RedeemLayout;
