import { Game } from '@/constants/game'
import { Team } from '@/constants/team'

export type GameDetail = {
  id: Game
  name: string
  maxScore: number
  isDaily: boolean
  sortRecord: 'ASC' | 'DESC'
  firebaseCollectionName: string
  created: string
  updated: string
}

export type TeamRankGame = {
  teamId: Team
  totalValue: number
}

export type TeamRank = {
  teamId: Team
  totalScore: number
}

export type GetAllTeamRankGameResposne = {
  game: GameDetail
  rank: TeamRankGame[]
}

export type GetOneGameResponse = {
  game: GameDetail
  open: boolean
  played: false
}
