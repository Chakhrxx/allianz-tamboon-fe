import StripLine4Image from '@/assets/images/strip-line-4.png'
import DollarsImage from '@/assets/images/dollars.png'
import { Link } from 'react-router-dom'
import CoinButton from '@/components/CoinButton'
import { useActivityState } from '@/hooks/useActivityState'
import classNames from 'classnames'

function LuckyDrawPage() {
  const { isLinkOpened } = useActivityState()
  return (
    <div className="relative h-full">
      <div className="relative z-10 px-5 pt-20 pb-32 flex flex-col justify-between items-center h-full">
        <div className="perspective-400">
          <div className="text-7xl text-center font-semibold transform -rotate-y-30 -translate-x-5">
            SUPER
            <br />
            LOTTO
          </div>
        </div>
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Link
              key={index}
              to={`${index + 1}`}
              className={classNames({
                'opacity-50 pointer-events-none': !isLinkOpened(
                  `luckydraw${index + 1}`
                ),
                'opacity-100': isLinkOpened(`luckydraw${index + 1}`)
              })}
            >
              <CoinButton className="w-24 h-24">
                <div className="text-lg font-semibold leading-4 italic text-primary">
                  ENTER <div className="text-sm">ROUND {index + 1}</div>
                </div>
              </CoinButton>
            </Link>
          ))}
        </div>
      </div>
      <img
        className="absolute bottom-0 right-0 h-4/5"
        src={StripLine4Image}
        alt="Strip Line"
      />
      <img
        className="absolute bottom-0 w-full"
        src={DollarsImage}
        alt="Dollars"
      />
    </div>
  )
}

export default LuckyDrawPage
