import TextField from '@/components/TextField'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/Button'
import { useMemo } from 'react'

type FormValues = {
  newPassword: string
  confirmNewPassword: string
}

type Props = {
  onSubmit: SubmitHandler<FormValues>
}

const validationSchema = yup.object().shape({
  newPassword: yup.string().min(6).required(),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required()
})

export default function ChangePasswordForm({ onSubmit }: Props) {
  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  })

  const shouldButtonDisabled = useMemo(() => {
    return !isValid || isSubmitting
  }, [isSubmitting, isValid])

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>New Password</label>
        <TextField
          {...register('newPassword')}
          error={errors.newPassword?.message}
          className="w-full"
          type="password"
        />
      </div>
      <div>
        <label>Confirm New Password</label>
        <TextField
          {...register('confirmNewPassword')}
          error={errors.confirmNewPassword?.message}
          className="w-full"
          type="password"
        />
      </div>
      <Button
        className="w-full !py-2 text-primary !mt-6"
        variant="warning"
        disabled={shouldButtonDisabled}
      >
        Submit
      </Button>
    </form>
  )
}
