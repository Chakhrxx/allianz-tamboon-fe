import classNames from 'classnames'
import { type TNumpadButton } from './Numpad'

type Props = {
  button: TNumpadButton
  disabled?: boolean
  onClick: (button: TNumpadButton) => void
}

function NumpadButton({ button, disabled, onClick }: Props) {
  return (
    <div
      className={classNames(
        'p-1 rounded-2xl active:scale-90 transition-all bg-gradient-to-br from-[#FDEF65] to-[#FABB36]',
        {
          'grayscale pointer-events-none': disabled
        }
      )}
    >
      <button
        className={classNames(
          ' text-black rounded-xl w-full h-full p-2 font-medium bg-gradient-to-br from-[#FDB135] via-[#FCCB39] to-[#FDB135]',
          {
            'text-4xl': !isNaN(parseInt(button)),
            'text-lg': isNaN(parseInt(button)),
            'text-white': disabled
          }
        )}
        onClick={() => onClick(button)}
      >
        {button}
      </button>
    </div>
  )
}

export default NumpadButton
