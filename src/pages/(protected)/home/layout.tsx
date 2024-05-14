import BgHomeImage from "@/assets/images/bg-home.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { queryClient } from "@/libs/query-client";
import { useState } from "react";
import LogoutConfirmOverlay from "./components/LogoutConfirmOverlay";
import Banner from "@/components/Banner";

function HomeLayout() {
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
      <Banner />

      <div className="relative px-8 py-10 h-full">
        <Outlet />
        <img
          className="absolute left-0 top-10 w-full"
          src={BgHomeImage}
          alt="Home Image"
        />
      </div>
      <LogoutConfirmOverlay
        show={showLogoutConfirmOverlay}
        onConfirm={logout}
        onBack={() => setShowLogoutConfirmOverlay(false)}
      />
    </>
  );
}

export default HomeLayout;
