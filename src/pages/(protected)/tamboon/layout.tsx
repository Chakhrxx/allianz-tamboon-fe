import BgMainImage from "@/assets/svgs/Tambbon-bg-header.svg";
import { Outlet } from "react-router-dom";

function CSRLayout() {
  return (
    <>
      <div className="relative">
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2  w-full"
          src={BgMainImage}
          alt="Main background"
        />

        <h1 className="relative text-white font-extrabold text-[28px] text-center py-4">
          Eagle coins
        </h1>

        <Outlet />
      </div>
    </>
  );
}

export default CSRLayout;
