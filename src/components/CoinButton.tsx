import CoinImage from '@/assets/images/coin.png'
import classNames from 'classnames'
import React from 'react'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: React.ReactNode
}

const CoinButton = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(
        'bg-cover flex flex-col items-center justify-center text-white text-shadow',
        props.className
      )}
      style={{ backgroundImage: `url(${CoinImage})` }}
    >
      {props.children}
    </button>
  )
})

export default CoinButton
