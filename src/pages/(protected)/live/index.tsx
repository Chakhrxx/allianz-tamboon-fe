import PageTitle from '@/components/PageTitle'
import ReactPlayer from 'react-player'
import BgCircleImage from '@/assets/images/bg-circle.png'
import { animated, useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/libs/firebase'

export default function LivePage() {
  const liveDotStyle = useSpring({
    from: { opacity: 0 },
    to: [{ opacity: 1 }, { opacity: 0 }],
    config: { duration: 1000 },
    loop: true
  })

  const [liveUrl, setLiveUrl] = useState('')

  useEffect(() => {
    getDoc(doc(db, 'app_metadata', 'live')).then((doc) => {
      if (!doc.exists()) return
      const { url } = doc.data() as { url: string }
      setLiveUrl(url)
    })
  }, [])

  return (
    <div className="relative p-2 h-full">
      <div className="relative z-10">
        <PageTitle className="flex items-center gap-3">
          <animated.div
            className="w-3 h-3 rounded-full bg-red-500"
            style={{ ...liveDotStyle, aspectRatio: 1 / 1 }}
          />
          LIVE
        </PageTitle>
        <div className="aspect-video">
          <ReactPlayer
            width="100%"
            height="100%"
            url={liveUrl}
            volume={0.1}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  showinfo: 0
                }
              }
            }}
          />
        </div>
      </div>
      <img
        className="absolute left-0 bottom-0 w-full"
        src={BgCircleImage}
        alt="Strip Line"
      />
    </div>
  )
}
