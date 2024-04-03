import { useEffect, useState } from 'react'
import { useContinuousScanner } from '@yudiel/react-qr-scanner'
import classNames from 'classnames'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { checkInService } from '@/services/checkin'
import Crypto from 'crypto-js'
import QrErrorOverlay, {
  QrErrorOverlayState
} from './components/QrErrorOverlay'
import { isAxiosError } from 'axios'
import BadgeOverlay, { BadgeOverlayState } from './components/BadgeOverlay'

export default function TownHallCameraPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [scanned, setScanned] = useState<boolean>(false)
  const [showQrErrorOverlay, setShowQrErrorOverlay] =
    useState<QrErrorOverlayState>({
      show: false,
      title: ''
    })
  const [badgeOverlay, setBadgeOverlay] = useState<BadgeOverlayState>({
    show: false,
    imageSrc: ''
  })

  const { ref, startScanning, stopScanning, loading } = useContinuousScanner({
    onResult: async (result) => {
      if (scanned) return
      setScanned(true)
      ref.current?.pause()
      const cipherText = result.getText()
      const bytes = Crypto.AES.decrypt(cipherText, import.meta.env.VITE_AES_KEY)
      const decryptedPayload = JSON.parse(bytes.toString(Crypto.enc.Utf8))
      try {
        const res = await checkInService.postCheckIn(
          decryptedPayload.id,
          decryptedPayload.uid
        )
        queryClient.invalidateQueries('profile')
        setBadgeOverlay({
          show: true,
          Header: () => (
            <h1 className="font-bold text-xl text-center">
              Congratulations!
              <br />
              You've got the badge
            </h1>
          ),
          imageSrc: res.data.badgeImgUrl
        })
      } catch (error) {
        if (isAxiosError(error)) {
          if (
            error.response?.data.message.toLowerCase() ===
            'this qr code is already used'
          ) {
            setShowQrErrorOverlay({
              show: true,
              title: 'This QR Code has already been used.',
              message: 'Please ask the exhibitor to provide a new QR Code.'
            })
          } else {
            setShowQrErrorOverlay({
              show: true,
              title:
                "You've already joined this activity and received the badge."
            })
          }
        }
      }
    },
    onError: (error) => setError(error.message),
    audio: false,
    options: {
      constraints: {
        aspectRatio: 1 / 1,
        facingMode: 'environment'
      }
    }
  })

  const handleCloseQrErrorOverlay = () => {
    setShowQrErrorOverlay({ show: false, title: '' })
    setScanned(false)
    ref.current?.play()
  }

  useEffect(() => {
    startScanning()
    return () => stopScanning()
  }, [startScanning, stopScanning])

  return (
    <div className="relative">
      {/* View finder */}
      {!loading ? (
        <ViewFinder scanned={scanned} />
      ) : (
        <div className="flex justify-center items-center text-xl">
          Loading Camera...
        </div>
      )}
      {
        // Error message
        error && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center p-5 bg-red-500 bg-opacity-70 text-white">
            {error}
          </div>
        )
      }

      <video ref={ref} className="w-full h-full" />
      <QrErrorOverlay
        {...showQrErrorOverlay}
        onBack={handleCloseQrErrorOverlay}
      />
      <BadgeOverlay
        show={badgeOverlay.show}
        Header={badgeOverlay.Header}
        imageSrc={badgeOverlay.imageSrc}
        onBack={() => navigate('/townhall')}
      />
    </div>
  )
}

const ViewFinder = ({ scanned }: { scanned: boolean }) => {
  const scannedClass = scanned ? 'border-green-500' : 'border-white'

  return (
    <div className="absolute w-full h-full">
      <div className="absolute top-0 left-0 w-full h-fullopacity-60" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center p-5">
        <div className="w-full h-full rounded-lg relative">
          <div
            className={classNames(
              'absolute top-0 left-0 w-1/4 h-1/4 border-t-2 border-l-2',
              scannedClass
            )}
          />
          <div
            className={classNames(
              'absolute top-0 right-0 w-1/4 h-1/4 border-t-2 border-r-2',
              scannedClass
            )}
          />
          <div
            className={classNames(
              'absolute bottom-0 left-0 w-1/4 h-1/4 border-b-2 border-l-2',
              scannedClass
            )}
          />
          <div
            className={classNames(
              'absolute bottom-0 right-0 w-1/4 h-1/4 border-b-2 border-r-2',
              scannedClass
            )}
          />
        </div>
      </div>
    </div>
  )
}
