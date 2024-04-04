import { Game } from "@/constants/game";

import SwimmingIcon from "@/assets/svgs/swimming.svg?react";
import AthleticIcon from "@/assets/svgs/athletic.svg?react";
import BasketballIcon from "@/assets/svgs/basketball.svg?react";
import HulaHoopIcon from "@/assets/svgs/hulahoop.svg?react";
import TugOfWarIcon from "@/assets/svgs/tugofwar.svg?react";
import CyclingIcon from "@/assets/svgs/cycling.svg?react";
import BoxingIcon from "@/assets/svgs/boxing.svg?react";
import RunningIcon from "@/assets/svgs/running.svg?react";
import { useMemo } from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  game: Game;
};

export default function GameIcon({ game, ...props }: Props) {
  const Icon = useMemo(() => {
    switch (game) {
      case Game.Swimming:
        return SwimmingIcon;
      case Game.Hurdle:
        return AthleticIcon;
      case Game.Basketball:
        return BasketballIcon;
      case Game.HulaHoop:
        return HulaHoopIcon;
      case Game.TugOfWar:
        return TugOfWarIcon;
      case Game.Cycling:
        return CyclingIcon;
      case Game.Boxing:
        return BoxingIcon;
      case Game.Running:
        return RunningIcon;
    }
  }, [game]);

  return <Icon {...props} />;
}
