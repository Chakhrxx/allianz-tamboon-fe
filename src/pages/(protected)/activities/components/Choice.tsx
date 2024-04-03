import React from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
}

const Choice = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <div>
    <input {...props} ref={ref} type="radio" className="peer" hidden />
    <label
      htmlFor={props.id}
      className="block bg-[#F3F3F3] border-2 border-[#AFB1B6] transition-all peer-checked:bg-[#F8AE17] peer-checked:border-white w-full px-5 py-3 rounded"
    >
      {props.label}
    </label>
  </div>
))

export default Choice
