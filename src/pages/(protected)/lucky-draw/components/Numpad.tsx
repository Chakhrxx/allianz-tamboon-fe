import classNames from 'classnames'
import NumpadButton from './NumpadButton'

// prettier-ignore
const numpadButtons = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  'Del', '0', 'Random',
] as const

export type TNumpadButton = (typeof numpadButtons)[number]

type Props = {
  containerClassName?: string
  disabled?: boolean
  onClick: (value: TNumpadButton) => void
}

function Numpad({ containerClassName, disabled, onClick }: Props) {
  return (
    <div
      className={classNames('group grid grid-cols-3 gap-3', containerClassName)}
    >
      {numpadButtons.map((button) => (
        <NumpadButton
          key={button}
          button={button}
          onClick={onClick}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

export default Numpad
