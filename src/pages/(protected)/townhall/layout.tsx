import Banner from "@/components/Banner";
import { Link, Outlet, useLocation } from "react-router-dom";
import LeftArrow from "@/assets/svgs/left-arrow.svg?react";

export default function TownHallLayout() {
  const location = useLocation();

  return (
    <div className="relative h-full">
      <div className="relative">
        {location.state?.backTo && (
          <Link
            className="block absolute left-6 top-1/2 -translate-y-1/2 mt-2"
            to={location.state.backTo}
          >
            <LeftArrow />
          </Link>
        )}
        <Banner />
      </div>
      <div className="p-5 space-y-4">
        <div className="italic"></div>
        <Outlet />
      </div>
    </div>
  );
}
