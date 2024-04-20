// import CoinImage from "@/assets/images/coin.png";
import classNames from "classnames";

type Props = {
  points?: number;
  className?: string;
};

export default function CSR({ points = 0, className }: Props) {
  return (
    <>
      <div
        className={classNames(
          "bg-cover  aspect-square flex flex-col items-center justify-center  text-shadow font-medium",
          className
        )}
        // style={{ backgroundImage: `url(${CoinImage})` }}
      >
        <div className="text-xl py-2 font-bold">แต้มบุญ </div>
        <div className="text-4xl">{points}</div>
        <div className="text-lg">CSR</div>
      </div>
    </>
  );
}
