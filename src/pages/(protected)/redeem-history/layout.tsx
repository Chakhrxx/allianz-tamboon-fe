import BgMainImage from "@/assets/svgs/Tambbon-bg-header.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { queryClient } from "@/libs/query-client";
import { useState } from "react";
import LogoutConfirmOverlay from "./components/LogoutConfirmOverlay";

function RedeemHistoryLayout() {
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
          Redeem History
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

export default RedeemHistoryLayout;
