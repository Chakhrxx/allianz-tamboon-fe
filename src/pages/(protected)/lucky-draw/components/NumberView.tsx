import classNames from 'classnames'

type Props = {
  sequence: number[]
  digits: number
  contrast?: boolean
}

function NumberView({ contrast, digits, sequence }: Props) {
  return (
    <div
      className={classNames('rounded-xl text-black p-2', {
        'bg-gradient-to-br from-[#0C51AC] via-[#2F69B8] to-[#003781]':
          !contrast,
        'sticky top-0 z-50 bg-gradient-to-br from-[#FFDF3B] via-[#FFFF79] to-[#FFAC34]':
          contrast
      })}
    >
      <div
        className={classNames('grid p-2 rounded-lg', {
          'bg-gradient-to-b from-[#003781] to-[#1E72B8] text-white': !contrast,
          'bg-gradient-to-b from-[#FFB935] to-[#FFDF3B] text-primary': contrast
        })}
        style={{
          gridTemplateColumns: `repeat(${digits}, 1fr)`
        }}
      >
        {Array.from({ length: digits }).map((_, index) => (
          <div
            key={index}
            className="flex justify-center items-center text-4xl font-medium"
          >
            {sequence[index] !== undefined ? sequence[index] : '_'}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NumberView
