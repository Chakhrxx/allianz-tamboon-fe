import Button from '@/components/Button'

type Props = {
  show: boolean
  onBack: () => void
  onConfirm: () => void
}

function ConfirmNumberOverlay({ show, onBack, onConfirm }: Props) {
  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 flex flex-col justify-center p-8 gap-6 z-50">
        <div className="text-center bg-[#1E72B8] bg-opacity-90 text-white h-72 flex flex-col justify-center p-5 rounded-xl gap-6 mt-28">
          <h1 className="text-3xl font-medium">How sure are you?</h1>
          <p className="text-lg leading-snug">
            You won't be able to change the number once you have submitted.
            <br />
            Good luck!
          </p>
        </div>

        <div className="space-y-2 w-full">
          <Button className="w-full" variant="warning" onClick={onConfirm}>
            I'M SURE!
          </Button>
          <Button variant="light" className="w-full" onClick={onBack}>
            GO BACK
          </Button>
        </div>
      </div>
    )
  )
}

export default ConfirmNumberOverlay
