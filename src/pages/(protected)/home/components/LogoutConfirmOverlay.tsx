import Button from '@/components/Button'

type Props = {
  show: boolean
  onConfirm: () => void
  onBack: () => void
}

function LogoutConfirmOverlay({ show, onConfirm, onBack }: Props) {
  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 flex flex-col justify-center p-8 gap-6 z-50">
        <p className="text-white text-xl text-center my-4">
          Are you sure you want to logout?
        </p>
        <div className="space-y-2 w-full">
          <Button className="w-full" variant="warning" onClick={onConfirm}>
            YES, I'M SURE
          </Button>
          <Button className="w-full" variant="light" onClick={onBack}>
            GO BACK
          </Button>
        </div>
      </div>
    )
  )
}

export default LogoutConfirmOverlay
