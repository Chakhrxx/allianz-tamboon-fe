import CoinImage from '@/assets/images/coin.png'
import classNames from 'classnames'

type Props = {
  points?: number
  className?: string
}

export default function Coin({ points = 0, className }: Props) {
  return (
    <div
      className={classNames(
        'bg-cover  aspect-square flex flex-col items-center justify-center text-white text-shadow',
        className
      )}
      style={{ backgroundImage: `url(${CoinImage})` }}
    >
      <div className="text-4xl font-medium">{points}</div>
      <div>{points > 1 ? 'coins' : 'coin'} </div>
    </div>
  )
}
