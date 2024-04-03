export enum Game {
  Swimming = 1,
  Hurdle = 2,
  Basketball = 3,
  HulaHoop = 4,
  TugOfWar = 5,
  Cycling = 6,
  Boxing = 7,
  Running = 8
}

export type GameStatus = 'WIN' | 'LOSE' | 'NOT_PLAYED'

export type GameIframeEventMessage<Data = void> = {
  name: string
  data?: Data
}
