import BgMainImage from '@/assets/images/bg-main.png'
import AzOlympicLogo from '@/assets/images/azay-olympic-logo.png'
import CoinButton from '@/components/CoinButton'

type Props = {
  onClose: () => void
}

function LoginCoverPage({ onClose }: Props) {
  return (
    <div className="relative h-full p-5">
      <img
        className="relative max-w-[300px] mx-auto z-10 py-16"
        src={AzOlympicLogo}
        alt="Azay Olympic Logo"
      />
      <div className="relative">
        <CoinButton
          className="relative w-48 h-48 mx-auto my-6 z-20"
          onClick={onClose}
        >
          <div className="text-3xl font-bold italic">LOGIN</div>
        </CoinButton>
        <img
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-full"
          src={BgMainImage}
          alt="Main background"
        />
      </div>
    </div>
  )
}

export default LoginCoverPage
