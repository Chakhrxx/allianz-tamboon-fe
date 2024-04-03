import ConfettiImage from '@/assets/images/confetti.png'
import StripLine7Image from '@/assets/images/strip-line-7.png'

function LoadingScreen() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center gap-5">
      <div className="relative z-10 space-y-4">
        <div className="text-4xl font-bold italic">
          <h1 className="ml-6">GET</h1>
          <h1>READY</h1>
          <h1 className="text-right">FOR</h1>
        </div>
        <div className="relative">
          <div className="w-32 h-32 border-2 border-primary rounded-full flex items-center justify-center italic font-medium">
            LOADING...
          </div>
          <div className="w-36 h-36 border border-transparent border-b-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate"></div>
        </div>
        <div className="text-4xl font-bold italic">
          <h1 className="-ml-4">STAFF</h1>
          <h1 className="ml-4">PARTY</h1>
        </div>
      </div>

      <img
        src={ConfettiImage}
        alt="confetti"
        className="absolute bottom-0 right-0"
      />
      <img
        src={StripLine7Image}
        alt="strip-line"
        className="absolute bottom-0 right-0"
      />
    </div>
  )
}

export default LoadingScreen
