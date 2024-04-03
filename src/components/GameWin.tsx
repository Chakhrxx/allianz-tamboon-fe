import NeckStrap from '@/assets/images/neck-strap.png'
import Coin from '@/assets/images/coin.png'
import Button from '@/components/Button'
import { useEffect } from 'react'

type Props = {
  show?: boolean
  onClose?: () => void
}

export default function GameWin({ show = false, onClose }: Props) {
  useEffect(() => {
    // preload images
    const images = [NeckStrap, Coin]

    images.forEach((image) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  return (
    show && (
      <div className="fixed w-screen h-screen top-0 left-0 bg-primary bg-opacity-90 text-center z-50 text-white">
        <img
          className="max-w-[200px] mx-auto"
          src={NeckStrap}
          alt="neck-strap"
        />
        <div className="space-y-6">
          <div
            className="w-48 h-48 rounded-full flex flex-col items-center justify-center mx-auto bg-no-repeat bg-cover -my-4"
            style={{ backgroundImage: `url(${Coin})` }}
          >
            <h3 className="text-xl font-bold drop-shadow-xl">PASSED</h3>
            <h1 className="text-5xl font-bold drop-shadow-xl">1</h1>
            <div className="text-lg drop-shadow-xl">coin</div>
          </div>
          <div className="p-5 space-y-4">
            <Button className="w-full" variant="warning" onClick={onClose}>
              COLLECT
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
