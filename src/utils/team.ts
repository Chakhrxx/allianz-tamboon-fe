import { Team } from '@/constants/team'
import RunnerYellow from '@/assets/svgs/runner-yellow.svg?react'
import RunnerBlue from '@/assets/svgs/runner-blue.svg?react'
import RunnerBlack from '@/assets/svgs/runner-black.svg?react'
import RunnerGreen from '@/assets/svgs/runner-green.svg?react'
import RunnerRed from '@/assets/svgs/runner-red.svg?react'

export class TeamUtil {
  private static teamColors = {
    [Team.BLUE]: '#3171C2',
    [Team.YELLOW]: '#F1A73B',
    [Team.BLACK]: '#25282A',
    [Team.GREEN]: '#58B75A',
    [Team.RED]: '#DA2E4A'
  }

  static getTeamName(team: Team) {
    return Team[team]
  }

  static getTeamColor(team: Team) {
    return this.teamColors[team]
  }

  static getTeamColors() {
    return this.teamColors
  }

  static getBarTrackRunnerIconByTeam(team: Team) {
    switch (team) {
      case Team.BLUE:
        return RunnerBlue
      case Team.YELLOW:
        return RunnerYellow
      case Team.BLACK:
        return RunnerBlack
      case Team.GREEN:
        return RunnerGreen
      case Team.RED:
        return RunnerRed
      default:
        return undefined
    }
  }
}
