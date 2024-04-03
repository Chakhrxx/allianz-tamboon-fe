import cn from 'classnames'
import { Team } from '@/constants/team'

import { useMemo } from 'react'
import { TeamUtil } from '@/utils/team'

type Props = {
  team: Team
  ranking: number
  score: number
  maxScore: number
}

const TRACK_CONTAINER_MARGIN = 55

function BarTrack({ team, score, maxScore, ranking }: Props) {
  const percent = useMemo(() => {
    if (score > maxScore) return 100
    return (score * 100) / maxScore
  }, [score, maxScore])
  const percentToLeft = useMemo(() => {
    if (percent > 100) return 100
    return (percent / 100) * TRACK_CONTAINER_MARGIN
  }, [percent])

  const colorClassName = getBarTrackColorByTeam(team)
  const RunnerIcon = TeamUtil.getBarTrackRunnerIconByTeam(team)

  return (
    <li className="relative flex items-center border-primary border-t-2 border-r-2 py-2">
      <div className="absolute top-1/2 -translate-y-1/2 left-3 text-left z-10 text-white font-bold">
        {score}
      </div>
      <div
        className="relative flex-grow flex items-center overflow-hidden transition-all duration-500"
        style={{ left: `${percentToLeft - TRACK_CONTAINER_MARGIN}%` }}
      >
        <div className={cn('bar flex-grow h-8', colorClassName)}></div>
        <div
          className={cn('clip-chevron-right w-8 h-8 -ml-2', colorClassName)}
        ></div>
        {RunnerIcon && <RunnerIcon />}
      </div>
      <div className="border-primary border-b-2 rotate-90 w-12">
        <div className="text-center text-2xl">{ranking}</div>
      </div>
    </li>
  )
}

const getBarTrackColorByTeam = (team: Team) => {
  switch (team) {
    case Team.BLUE:
      return 'bg-gradient-to-r from-[#0885E0] to-[#0074C9]'
    case Team.YELLOW:
      return 'bg-gradient-to-r from-[#FFB530] to-[#FFA401]'
    case Team.BLACK:
      return 'bg-gradient-to-r from-[#2D3840] to-[#24282B]'
    case Team.GREEN:
      return 'bg-gradient-to-r from-[#01963A] to-[#00AD42]'
    case Team.RED:
      return 'bg-gradient-to-r from-[#FE2765] to-[#ED0044]'
    default:
      return ''
  }
}

export default BarTrack
