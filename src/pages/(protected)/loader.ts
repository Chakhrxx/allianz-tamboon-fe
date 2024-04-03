import { queryClient } from '@/libs/query-client'
import { authService } from '@/services/auth'
import { Profile } from '@/services/auth/type'
import { LoaderFunction, redirect } from 'react-router-dom'

export const protectedRouteLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem('token')

  if (!accessToken) {
    return redirect('/login')
  }

  const profile = await queryClient.fetchQuery<Profile>({
    queryKey: 'profile',
    queryFn: authService.retrieveUser
  })

  if (!profile) {
    return redirect('/login')
  }

  return null
}
