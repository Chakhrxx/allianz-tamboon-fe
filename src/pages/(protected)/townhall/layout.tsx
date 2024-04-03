import Banner from '@/components/Banner'
import { Link, Outlet, useLocation } from 'react-router-dom'
import LeftArrow from '@/assets/svgs/left-arrow.svg?react'

export default function TownHallLayout() {
  const location = useLocation()

  return (
    <div className="relative h-full">
      <div className="relative">
        {location.state?.backTo && (
          <Link
            className="block absolute left-6 top-1/2 -translate-y-1/2 mt-2"
            to={location.state.backTo}
          >
            <LeftArrow />
          </Link>
        )}
        <Banner />
      </div>
      <div className="p-5 space-y-4">
        <div className="italic">
          <div className="font-medium">Town Hall</div>
          <div className="font-semibold text-lg">Badge collection</div>
          <hr className="h-[3px] my-1 bg-primary rounded-full" />
          <p className="leading-5 text-sm font-medium">
            Join activities at Town Hall event, collect at least 5 out of 8
            badges, and get a chance to win the Lucky Draw!
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
