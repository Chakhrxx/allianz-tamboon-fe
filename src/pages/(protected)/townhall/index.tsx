import CameraSolidIcon from "@/assets/svgs/camera-solid.svg?react";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import BadgeOverlay, { BadgeOverlayState } from "./components/BadgeOverlay";
import { useState } from "react";
import BgCircleImage from "@/assets/images/bg-circle.png";

export default function TownHallPage() {
  const [badgeOverlay, setBadgeOverlay] = useState<BadgeOverlayState>({
    show: false,
    imageSrc: "",
  });

  return (
    <div className="relative h-full">
      <div className="relative z-20 flex justify-center flex-wrap gap-2"></div>
      <Link
        className="block relative z-20 mt-72"
        to="camera"
        state={{ backTo: "/townhall" }}
      >
        <Button className="w-full flex items-center justify-center gap-4">
          <CameraSolidIcon />
          <div>Open Camera</div>
        </Button>
      </Link>
      <BadgeOverlay
        show={badgeOverlay.show}
        imageSrc={badgeOverlay.imageSrc}
        message={badgeOverlay.message}
        onBack={() => setBadgeOverlay({ ...badgeOverlay, show: false })}
      />
      <img
        className="absolute bottom-0 w-full z-10"
        src={BgCircleImage}
        alt="Circle Image"
      />
    </div>
  );
}
