import { axiosInstance } from '@/libs/axios'
import { LoginResponse, Profile } from './type'

export const authService = {
  login: (username: string, password: string) => {
    return axiosInstance
      .post<LoginResponse>('/auth/signin', {
        username,
        password
      })
      .then((response) => response.data)
  },
  retrieveUser: () => {
    return axiosInstance<Profile>('/profile').then((response) => response.data)
  },
  activate: () => {
    return axiosInstance.post('/activate')
  }
}
