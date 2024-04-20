import classNames from 'classnames'
import CoinImage from '@/assets/images/coin.png'
import BreakIcon from '@/assets/svgs/break.svg?react'

import { GameStatus } from '@/constants/game'

type Props = {
  className?: string
  status: GameStatus
  children?: React.ReactNode
}

function SportCoin({ children, className, status }: Props) {
  const style = getStyleByStatus(status)

  return (
    <div
      className={classNames(
        'relative bg-cover flex flex-col items-center justify-center text-white text-shadow border-4 border-primary rounded-full overflow-hidden',
        className
      )}
      style={{ ...style }}
    >
      {children}
      {status !== 'WIN' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white w-5/6 h-5/6 rounded-full" />
      )}
      <div className="absolute top-0 left-0 rounded-full bg-black/50"></div>
      {status === 'LOSE' && (
        <div className="absolute bg-black/50 w-full h-full z-10 flex justify-center items-center font-bold">
          FAILED
        </div>
      )}
      {status === 'LOSE' && <BreakIcon className="absolute" />}
    </div>
  )
}

function getStyleByStatus(status: GameStatus) {
  switch (status) {
    case 'WIN':
      return {
        backgroundImage: `url(${CoinImage})`
      }
    case 'LOSE':
      return {
        backgroundColor: '#575757'
      }
    case 'NOT_PLAYED':
      return {
        backgroundColor: '#AFB1B6'
      }
  }
}

export default SportCoin
