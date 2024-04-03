import BgCircleImage from '@/assets/images/bg-circle.png'
import Banner from '@/components/Banner'
import { Outlet } from 'react-router-dom'

export default function ActivitiesLayout() {
  return (
    <>
      <Banner />
      <div className="relative h-full">
        <Outlet />
        <img
          className="absolute left-0 bottom-0 w-full"
          src={BgCircleImage}
          alt="Strip Line"
        />
      </div>
    </>
  )
}
