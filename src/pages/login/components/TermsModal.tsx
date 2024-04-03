import BaseModal, { ModalProps } from '@/components/BaseModal'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import { ChangeEventHandler, useState } from 'react'

type Props = ModalProps & {
  onAccept: () => void | Promise<void>
}

export default function TermsModal({ onAccept, ...props }: Props) {
  const [accepted, setAccepted] = useState(false)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAccepted(evt.target.checked)
  }

  const handleClick = () => {
    if (!accepted) return
    onAccept()
  }

  return (
    <BaseModal className="!bg-transparent" {...props}>
      <div className="flex flex-col justify-center p-5 bg-[#1E72B8] rounded-xl min-h-64">
        <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
        <p className="leading-snug text-lg">
          Allianz will process your e-mail and information to Box Exhibit co.,
          Ltd. for the purpose relating to organizing Allianz Staff Party 2024
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Checkbox
            id="accept-terms"
            className="border-[#1E72B8]"
            onChange={handleChange}
          />
          <label htmlFor="accept-terms">
            I agree to the terms and conditions
          </label>
        </div>
      </div>
      <Button
        className="w-full mt-8"
        variant="warning"
        onClick={handleClick}
        disabled={!accepted}
      >
        Submit
      </Button>
    </BaseModal>
  )
}
