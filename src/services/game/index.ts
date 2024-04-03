import { axiosInstance } from '@/libs/axios'
import {
  GetOneGameResponse,
  GetAllTeamRankGameResposne,
  GameDetail,
  TeamRank
} from './type'
import { Game } from '@/constants/game'

export const gameService = {
  getAllTeamRankGameScore: async () => {
    return axiosInstance<GetAllTeamRankGameResposne[]>('/teamrank-game').then(
      (res) => res.data
    )
  },
  getAllTeamRankScore: async () => {
    return axiosInstance<TeamRank[]>('/teamrankall').then((res) => res.data)
  },
  getAllGames: async () => {
    return axiosInstance<GameDetail[]>('/allgame').then((res) => res.data)
  },
  getOneGame: async (gameId: Game) => {
    return axiosInstance<GetOneGameResponse>(`/playgame/${gameId}`).then(
      (res) => res.data
    )
  },
  submitGameScore: async ({
    gameId,
    score,
    record = 0
  }: {
    gameId: Game
    score: number
    record?: number
  }) => {
    return axiosInstance
      .post(`/playgame/${gameId}`, { score, record })
      .then((res) => res.data)
  }
}
