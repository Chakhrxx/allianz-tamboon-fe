import { authService } from '@/services/auth'
import { Profile } from '@/services/auth/type'
import { QueryKey, UseQueryOptions, useQuery } from 'react-query'

export const useProfile = (
  options?: Omit<
    UseQueryOptions<Profile, unknown, Profile, QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<Profile>('profile', authService.retrieveUser,{
    enabled: options?.enabled ?? true,
    ...options,
  })
}
