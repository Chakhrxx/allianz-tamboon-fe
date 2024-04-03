import { Game, GameStatus } from '@/constants/game'
import { Team } from '@/constants/team'

export type LoginResponse = {
  accessToken: string
}

export type Role = 'ADMIN' | 'USER'

export type GameSummary = {
  game: {
    id: Game
    name: string
    firebaseCollectionName: string
    sumScore?: number
  }
  state: GameStatus
}

export type QuizSummary = {
  quiz: {
    id: number
    name: string
  }
  state: 'WIN' | 'NOT_PLAYED'
}

export type CheckInSummary = {
  id: number
  name: string
  title: string
  description: string
  badgeImg: string
  checked: boolean
}

export type Profile = {
  profile: {
    id: number
    username: string
    displayName: string
    profileImgUrl: string | null
    shirtSize: string | null
    registered: boolean
    activatedDate: string | null
    idInTeam: string | null
    teamId: Team
    roles: Role[]
    created: string
    updated: string
    totalscore: number
    rank: number
    branchId: number
  }
  coins: number
  gameSummary: GameSummary[]
  quizSummary: QuizSummary[]
  dailyGameSummary: GameSummary[]
  checkinSummary: CheckInSummary[]
}
