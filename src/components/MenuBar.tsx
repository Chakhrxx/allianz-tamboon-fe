import React, { useState } from "react";
import { Link } from "react-router-dom";

import ProfileIcon from "@/assets/svgs/profile.svg?react";
import TamboonIcon from "@/assets/svgs/eagleCoins.svg?react";
// import HomeIcon from "@/assets/svgs/home.svg?react";
import RedeemIcon from "@/assets/svgs/redeen-icon.svg?react";
import classNames from "classnames";

type MenuItem = {
  id: string;
  label: string;
  path: string;
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const menuItems: MenuItem[] = [
  // {
  //   path: "/",
  //   label: "Home",
  //   IconComponent: HomeIcon,
  // },
  {
    id: "csr",
    path: "/csr",
    label: "Eagle coins",
    IconComponent: TamboonIcon,
  },
  {
    id: "redeem",
    path: "/redeem",
    label: "Redeem",
    IconComponent: RedeemIcon,
  },
  {
    id: "profile",
    path: "/profile",
    label: "Profile",
    IconComponent: ProfileIcon,
  },
];

function MenuBar() {
  const [activeTab, setActiveTab] = useState<string>("");
  return (
    <nav className="bg-primary px-3 py-2 text-white rounded-full m-5 drop-shadow-lg">
      <ul className="flex justify-center gap-10 items-end h-full">
        {menuItems.map(({ label, path, IconComponent, id }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={classNames("", {
              "": activeTab === id,
              "bg-inherit opacity-60": activeTab !== id,
            })}
          >
            <Link to={path}>
              <IconComponent className="mx-auto" />
              <small>{label}</small>
            </Link>
            {/* <Link
              to={path}
              className={({ isActive }) => (isActive ? "block" : "opacity-70")}
            >
              <IconComponent
                className={`mx-auto ${!isActive && "bg-inherit"}`}
              />
              <small>{label}</small>
            </Link> */}
          </button>
        ))}
      </ul>
    </nav>
  );
}

export default MenuBar;
