import { axiosInstance } from '@/libs/axios'
import {
  GetAllQuizResponse,
  GetOneQuizResponse,
  GetSubmitAnswerResponse
} from './type'

export const quizService = {
  getAll: async () => {
    return axiosInstance<GetAllQuizResponse>('/quiz').then((res) => res.data)
  },
  getOne: async (id: number) => {
    return axiosInstance<GetOneQuizResponse>(`/quiz/${id}`).then(
      (res) => res.data
    )
  },
  submitAnswer: async ({
    questionId,
    userAnswer
  }: {
    questionId: number
    userAnswer: number
  }) => {
    return axiosInstance
      .post<GetSubmitAnswerResponse>(`/quiz/${questionId}`, { userAnswer })
      .then((res) => res.data)
  }
}
