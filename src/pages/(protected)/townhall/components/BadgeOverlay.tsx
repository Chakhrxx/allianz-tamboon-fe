import Button from '@/components/Button'
import React from 'react'

export type BadgeOverlayState = {
  show: boolean
  Header?: React.FC
  message?: string
  imageSrc: string
}

type Props = {
  show: boolean
  Header?: React.FC
  message?: string
  imageSrc: string
  onBack: () => void
}

export default function BadgeOverlay({
  show,
  Header,
  imageSrc,
  message,
  onBack
}: Props) {
  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 flex flex-col justify-center p-8 gap-10 z-50 text-white">
        <div className="space-y-8">
          {Header && <Header />}
          <div className="relative">
            <img
              className="relative max-w-[180px] mx-auto z-20"
              src={imageSrc}
              alt="Badge Image"
            />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-white/50 blur-2xl" />
          </div>

          <p className="leading-5 text-center">{message}</p>
        </div>
        {/* White circle glow */}
        <div className="space-y-2 w-full">
          <Button className="w-full" variant="warning" onClick={onBack}>
            OK
          </Button>
        </div>
      </div>
    )
  )
}
