import { useProfile } from '@/hooks/useProfile'
import CameraSolidIcon from '@/assets/svgs/camera-solid.svg?react'
import Button from '@/components/Button'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { CheckInSummary } from '@/services/auth/type'
import BadgeOverlay, { BadgeOverlayState } from './components/BadgeOverlay'
import { useState } from 'react'
import BgCircleImage from '@/assets/images/bg-circle.png'

export default function TownHallPage() {
  const { data: profile } = useProfile()
  const [badgeOverlay, setBadgeOverlay] = useState<BadgeOverlayState>({
    show: false,
    imageSrc: ''
  })
  const openBadge = (checkIn: CheckInSummary) => {
    setBadgeOverlay({
      show: true,
      message: checkIn.name,
      imageSrc: checkIn.badgeImg
    })
  }

  return (
    <div className="relative h-full">
      <div className="relative z-20 flex justify-center flex-wrap gap-2">
        {profile?.checkinSummary.map((checkin) => (
          <button
            className="relative block max-w-[90px]"
            key={checkin.id}
            onClick={() => openBadge(checkin)}
          >
            {!checkin.checked && (
              <img
                src={checkin.badgeImg}
                alt={checkin.name}
                className="absolute top-0 left-0 filter brightness-0 invert"
              />
            )}
            <img
              src={checkin.badgeImg}
              alt={checkin.name}
              className={classNames('transition-all', {
                'grayscale opacity-50': !checkin.checked
              })}
            />
          </button>
        ))}
      </div>
      <Link
        className="block relative z-20 mt-10"
        to="camera"
        state={{ backTo: '/townhall' }}
      >
        <Button className="w-full flex items-center justify-center gap-4">
          <CameraSolidIcon />
          <div>Open Camera</div>
        </Button>
      </Link>
      <BadgeOverlay
        show={badgeOverlay.show}
        imageSrc={badgeOverlay.imageSrc}
        message={badgeOverlay.message}
        onBack={() => setBadgeOverlay({ ...badgeOverlay, show: false })}
      />
      <img
        className="absolute bottom-0 w-full z-10"
        src={BgCircleImage}
        alt="Circle Image"
      />
    </div>
  )
}
