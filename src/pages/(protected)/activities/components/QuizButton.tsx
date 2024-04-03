import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  quizId: number
  name: string
  className?: string
}

const QuizButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ disabled = false, quizId, ...props }, ref) => (
    <Link className="block" to={`${quizId}`}>
      <button
        {...props}
        disabled={disabled}
        ref={ref}
        className={classNames(
          'bg-[#1E72B8] h-28 w-full text-white border-2 border-white rounded-lg uppercase font-medium disabled:bg-[#929292] transition-all',
          props.className
        )}
      >
        {props.name}
      </button>
    </Link>
  )
)

export default QuizButton
