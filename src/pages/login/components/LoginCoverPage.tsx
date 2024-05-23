import BgMainImage from "@/assets/svgs/Tambbon-Login-bg.svg";
import CoinAnimation from "@/assets/images/250-3D Coin Animation-V2.png";

type Props = {
  onClose: () => void;
};

function LoginCoverPage({ onClose }: Props) {
  return (
    <div className="relative h-full p-5 flex flex-col items-center">
      <img
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full object-cover"
        src={BgMainImage}
        alt="Main background"
      />

      <img
        className="relative max-w-[320px] mx-auto mt-24"
        src={CoinAnimation}
        alt="Allianz Ayudhya Logo"
      />

      <div className="relative mt-6">
        <div
          className="relative bg-[#223D7C] w-[110px] py-3 mx-auto z-20 rounded-full"
          onClick={onClose}
        >
          <div className=" text-lg font-normal text-white text-center">
            LOGIN
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCoverPage;
