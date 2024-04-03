import Button from '@/components/Button'
import { useProfile } from '@/hooks/useProfile'
import { useMemo } from 'react'
import QRCode from 'react-qr-code'
import { Link } from 'react-router-dom'

function ProfileQRPage() {
  const { data: profile } = useProfile()

  const qrValue = useMemo(() => {
    return JSON.stringify({
      id: profile?.profile.id,
      displayName: profile?.profile.displayName,
      username: profile?.profile.username,
      branchId: profile?.profile.branchId
    })
  }, [profile])

  return (
    <div className="relative z-10 text-center space-y-2">
      <div className="font-bold">Scan QR to play Sports Experience</div>
      <div className="border-2 border-primary bg-white w-fit mx-auto p-5 rounded-xl">
        <QRCode fgColor="#003781" value={qrValue} />
      </div>
      <Link className="block !mt-5" to="/profile">
        <Button
          variant="warning"
          className="w-full !text-primary bg-opacity-90 drop-shadow-xl"
        >
          BACK TO PROFILE
        </Button>
      </Link>
    </div>
  )
}

export default ProfileQRPage
