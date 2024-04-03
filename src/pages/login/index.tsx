import { useForm } from 'react-hook-form'
import TextField from '@/components/TextField'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import AzayOlympicLogoImage from '@/assets/images/azay-olympic-logo.png'
import BgCircleImage from '@/assets/images/bg-circle.png'
import Button from '@/components/Button'
import { useMemo, useState } from 'react'
import { authService } from '@/services/auth'
import { useNavigate } from 'react-router'
import LoginCoverPage from './components/LoginCoverPage'
import { isAxiosError } from 'axios'
import TermsModal from './components/TermsModal'
import { useProfile } from '@/hooks/useProfile'

const validationSchema = yup.object().shape({
  email: yup.string().trim().required(),
  password: yup.string().min(6).required()
})

function LoginPage() {
  const navigate = useNavigate()
  const { refetch: refetchProfile } = useProfile({ enabled: false });
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showLoginCoverPage, setShowLoginCoverPage] = useState(true)
  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
    setError,
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  })

  const shouldSubmitBtnDisabled = useMemo(
    () => !isValid || isSubmitting,
    [isSubmitting, isValid]
  )
  const onSubmit = handleSubmit(async (data) => {
    const loginData = await signIn(data.email, data.password)

    if (!loginData!.profile.activatedDate) {
      setShowTermsModal(true)
      return
    }

    navigate('/')
  })

  const handleTermsAccepted = async () => {
    await authService.activate()
    setShowTermsModal(false)
    navigate('/')
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { accessToken } = await authService.login(email, password)
      localStorage.setItem('token', accessToken)
      const { data } = await refetchProfile()
      return data
    } catch (error) {
      reset(undefined, { keepValues: true })

      if (!isAxiosError(error)) {
        console.error(error)
        return
      }

      if (error.response?.status === 401) {
        setError('email', { message: 'Invalid email or password' })
        setError('password', { message: 'Invalid email or password' })
      }
    }
  }

  return showLoginCoverPage ? (
    <LoginCoverPage onClose={() => setShowLoginCoverPage(false)} />
  ) : (
    <>
      <div className="relative flex flex-col h-full">
        <img
          className="max-w-[300px] mx-auto mt-10 mb-8 py-14"
          src={AzayOlympicLogoImage}
          alt="Azay Olymic Logo"
        />
        <form className="relative space-y-3 z-20 p-5" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label>E-mail</label>
            <TextField
              {...register('email')}
              className="w-full"
              placeholder="Hello@allianz.co.th"
              error={errors.email?.message}
            />
          </div>
          <div className="space-y-1">
            <label>Password</label>
            <TextField
              {...register('password')}
              className="w-full"
              type="password"
              placeholder="********"
              error={errors.password?.message}
            />
          </div>
          <small className="block text-center text-red-500 font-medium mt-2">
            {errors.root?.message}
          </small>
          <Button
            className="relative w-full !mt-12"
            disabled={shouldSubmitBtnDisabled}
          >
            Submit
          </Button>
        </form>
        <img
          className="absolute bottom-0 w-full"
          src={BgCircleImage}
          alt="Strip Line"
        />
      </div>
      <TermsModal
        isOpen={showTermsModal}
        onAccept={handleTermsAccepted}
        onClose={() => setShowTermsModal(false)}
      />
    </>
  )
}

export default LoginPage
