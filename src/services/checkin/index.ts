import { axiosInstance } from '@/libs/axios'

export const checkInService = {
  postCheckIn: async (id: number, uid: string) => {
    return axiosInstance.post(`/checking-in/${id}`, {
      uid,
    })
  }
}
