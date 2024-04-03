import classNames from 'classnames'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className }: Props) {
  return (
    <div className={classNames('mb-4 mt-2 font-bold', className)}>
      {children}
    </div>
  )
}
