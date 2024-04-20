import { Outlet } from "react-router-dom";
import Banner from "@/components/Banner";
function CSRLayout() {
  return (
    <>
      <Banner />
      <div className="relative px-8 h-full">
        <Outlet />
      </div>
    </>
  );
}

export default CSRLayout;
