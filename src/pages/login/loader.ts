import { queryClient } from '@/libs/query-client'
import { authService } from '@/services/auth'
import { LoaderFunction, redirect } from 'react-router-dom'

export const loginLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem('token')
  if (accessToken) {
    const profile = await queryClient.fetchQuery(
      'profile',
      authService.retrieveUser
    )

    if (profile) {
      return redirect('/')
    }
  }

  return null
}
