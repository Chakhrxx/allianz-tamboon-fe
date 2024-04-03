import Button from '@/components/Button'

type Props = {
  show: boolean
  onBack: () => void
}

function SuccessSubmitOverlay({ show, onBack }: Props) {
  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 flex flex-col justify-center p-8 gap-6 z-50">
        <div className="text-center bg-[#1E72B8] bg-opacity-90 text-white h-72 flex flex-col justify-center p-5 rounded-xl gap-6 mt-28">
          <h1 className="text-3xl font-medium">Hooray!</h1>
          <p className="text-lg leading-snug">
            You've successfully submitted your lucky number!
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

export default SuccessSubmitOverlay
