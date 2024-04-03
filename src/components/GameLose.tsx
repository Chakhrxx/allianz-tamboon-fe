import BrokeCoins from '@/assets/images/broke-coins.png'
import Button from '@/components/Button'
import { useEffect } from 'react'

type Props = {
  show?: boolean
  onClose?: () => void
}

export default function GameLose({ show = false, onClose }: Props) {
  useEffect(() => {
    // preload image
    const images = [BrokeCoins]

    images.forEach((image) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  return (
    show && (
      <div className="fixed top-0 left-0 w-screen h-screen bg-primary bg-opacity-90 text-center z-50 text-white">
        <img className="" src={BrokeCoins} alt="broke-coins" />
        <div className="p-8 space-y-6">
          <div className="-mt-12 w-48 h-48 rounded-full bg-[#575757] flex flex-col items-center justify-center mx-auto border border-white ring-[12px] ring-[#575757]">
            <h3 className="text-2xl font-bold">FAILED</h3>
            <h1 className="text-7xl font-bold">0</h1>
            <div className="text-lg">coin</div>
          </div>
          <p>Train harder for the next challenge</p>
          <Button className="w-full" variant="warning" onClick={onClose}>
            GO TO SCOREBOARD
          </Button>
        </div>
      </div>
    )
  )
}
