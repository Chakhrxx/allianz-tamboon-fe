import { axiosInstance } from '@/libs/axios'
import { GetOneLuckyDrawResponse } from './type'

export const luckyDrawService = {
  submitLuckyDraw: async ({
    luckyDrawId,
    choosenNumber
  }: {
    luckyDrawId: number
    choosenNumber: string
  }) => {
    return axiosInstance.post(`/luckydraw/${luckyDrawId}`, { choosenNumber })
  },
  getLuckyDrawById: async (id: number) => {
    return axiosInstance<GetOneLuckyDrawResponse>(`/luckydraw/${id}`).then(
      (res) => res.data
    )
  }
}
