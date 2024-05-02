import BgMainImage from "@/assets/svgs/Tambbon-Login-bg.svg";
import AllianzLogo from "@/assets/svgs/Allianz-Ayudhya-Logo.svg";
// import CoinButton from "@/components/CoinButton";

type Props = {
  onClose: () => void;
};

function LoginCoverPage({ onClose }: Props) {
  return (
    <div className="relative h-full p-5">
      <img
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full"
        src={BgMainImage}
        alt="Main background"
      />
      <img
        className="relative max-w-[300px] mx-auto z-10 py-36"
        src={AllianzLogo}
        alt="Allianz Ayudhya Logo"
      />
      <div className="relative">
        <div
          className="relative bg-[#4A4DE7] w-48 p-2 mx-auto my-6 z-20 rounded-full "
          onClick={onClose}
        >
          <div className="text-xl italic text-white text-center">LOGIN</div>
        </div>
        <div
          className="relative  w-48 p-2 mx-auto my-6 z-20 rounded-full border-2 border-[#4A4DE7] "
          onClick={onClose}
        >
          <div className="text-xl italic text-white text-center">SIGN UP</div>
        </div>
      </div>
    </div>
  );
}

export default LoginCoverPage;
