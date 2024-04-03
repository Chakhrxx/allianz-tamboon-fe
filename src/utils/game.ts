import { Game } from '@/constants/game'

import SwimmingImage from '@/assets/images/sports/swimming.png'
import AthleticImage from '@/assets/images/sports/athletic.png'
import BasketballImage from '@/assets/images/sports/basketball.png'
import HulaHoopImage from '@/assets/images/sports/hulahoop.png'
import TugOfWarImage from '@/assets/images/sports/tugofwar.png'
import { Team } from '@/constants/team'

export class GameUtil {
  static getGameIframeUrl(game: Game, team: Team) {
    switch (game) {
      case Game.Swimming:
        return import.meta.env.VITE_SWIMMING_GAME_URL
      case Game.Hurdle:
        return import.meta.env.VITE_RUNNING_GAME_URL
      case Game.Basketball:
        return import.meta.env.VITE_BASKETBALL_GAME_URL
      case Game.HulaHoop:
        return `${import.meta.env.VITE_HULAHOOP_GAME_URL}?teamId=${team}`
      case Game.TugOfWar:
        return `${import.meta.env.VITE_TUGOFWAR_GAME_URL}?teamId=${team}`
    }
  }

  static getGameButtonImage(game: Game) {
    switch (game) {
      case Game.Swimming:
        return SwimmingImage
      case Game.Hurdle:
        return AthleticImage
      case Game.Basketball:
        return BasketballImage
      case Game.HulaHoop:
        return HulaHoopImage
      case Game.TugOfWar:
        return TugOfWarImage
      default:
        return SwimmingImage
    }
  }
}
