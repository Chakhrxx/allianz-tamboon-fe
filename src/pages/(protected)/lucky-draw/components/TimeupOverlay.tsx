import Button from '@/components/Button'
import XCircleIcon from '@/assets/svgs/x-circle.svg?react'

type Props = {
  show: boolean
  onBack: () => void
}

function TimeupOverlay({ show, onBack }: Props) {
  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 flex flex-col justify-center p-8 gap-6 z-50">
        <div className="text-center bg-[#B81E30] bg-opacity-90 text-white h-72 flex flex-col justify-center p-5 rounded-xl gap-6 mt-28">
          <XCircleIcon className="mx-auto" />
          <h1 className="text-3xl font-medium">Time's up!</h1>
          <p className="text-lg leading-snug">
            You cannot submit the number.
            <br />
            Good luck with the next activity!
          </p>
        </div>

        <div className="space-y-2 w-full">
          <Button className="w-full" variant="warning" onClick={onBack}>
            OK
          </Button>
        </div>
      </div>
    )
  )
}

export default TimeupOverlay
