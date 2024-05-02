import React from "react";
import { Link } from "react-router-dom";

import ProfileIcon from "@/assets/svgs/profile.svg?react";
import TamboonIcon from "@/assets/svgs/tamboon-icon.svg?react";
import HomeIcon from "@/assets/svgs/home.svg?react";
import RedeemIcon from "@/assets/svgs/redeen-icon.svg?react";

type MenuItem = {
  label: string;
  path: string;
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const menuItems: MenuItem[] = [
  {
    path: "/",
    label: "Home",
    IconComponent: HomeIcon,
  },
  {
    path: "/csr",
    label: "Tam-boon",
    IconComponent: TamboonIcon,
  },
  {
    path: "/redeem",
    label: "Redeem",
    IconComponent: RedeemIcon,
  },
  {
    path: "/profile",
    label: "Profile",
    IconComponent: ProfileIcon,
  },
];

function MenuBar() {
  return (
    <nav className="bg-primary px-3 py-2 text-white rounded-full m-5 drop-shadow-lg">
      <ul className="flex justify-center gap-10 items-end h-full">
        {menuItems.map(({ label, path, IconComponent }) => (
          <li key={path}>
            <Link to={path}>
              <IconComponent className="mx-auto" />
              <small>{label}</small>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuBar;
