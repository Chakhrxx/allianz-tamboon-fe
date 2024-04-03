import LogoImage from '@/assets/images/logo.png'
import BgCharacterImage from '@/assets/images/bg-character.png'

function ActivitiesCoverPage() {
  return (
    <div className="relative z-10 flex flex-col gap-4 p-5 h-full pt-12">
      <div className="italic text-center font-bold text-3xl">
        <h1 className="text-5xl">STAY TUNED!</h1>
        <h1>SEE YOU AT</h1>
      </div>
      <img className="max-w-[220px] mx-auto" src={LogoImage} alt="Logo" />
      <h1 className="text-5xl italic font-bold text-center">16 FEB</h1>
      <img src={BgCharacterImage} alt="Character" />
    </div>
  )
}

export default ActivitiesCoverPage
