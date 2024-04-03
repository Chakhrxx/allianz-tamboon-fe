import BannerImage from '@/assets/images/banner.png'

export default function Banner() {
  return (
    <img
      className="max-w-[150px] mx-auto pt-4"
      src={BannerImage}
      alt="Banner"
    />
  )
}
