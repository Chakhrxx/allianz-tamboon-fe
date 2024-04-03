import { Team } from '@/constants/team'
import { TeamUtil } from '@/utils/team'
import classNames from 'classnames'

type Props = {
  team: Team
  className?: string
}

function TeamBadge({ team, className }: Props) {
  const color = TeamUtil.getTeamColor(team)
  const name = TeamUtil.getTeamName(team)
  return (
    <div
      className={classNames(
        'capitalize w-24 text-center text-xs rounded-full font-bold drop-shadow-lg text-white',
        className
      )}
      style={{
        backgroundColor: color
      }}
    >
      {name}
    </div>
  )
}

export default TeamBadge
