import Button from '@/components/Button'
import StripLine6Image from '@/assets/images/strip-line-6.png'
import { useMemo } from 'react'
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate
} from 'react-router-dom'
import MenuBar from '@/components/MenuBar'

const ErrorPage = () => {
  const routeError = useRouteError()
  const navigate = useNavigate()
  const error = useMemo(() => {
    if (!isRouteErrorResponse(routeError)) {
      return {
        status: 500,
        statusText: 'Internal Server Error',
        data: "We're sorry, but something went wrong."
      }
    }

    return routeError
  }, [routeError])

  return (
    <main className="max-w-md mx-auto h-dynamic-screen flex items-center">
      <div className="relative z-10 w-full text-center flex flex-col justify-between h-full">
        <div className="flex flex-col justify-center flex-grow p-5 gap-4">
          <p className="font-medium text-xl">{error.data}</p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>

        <MenuBar />
      </div>
      <img
        src={StripLine6Image}
        alt="strip-line"
        className="absolute bottom-0 right-0"
      />
    </main>
  )
}

export default ErrorPage
