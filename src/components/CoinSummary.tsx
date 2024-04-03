import { TeamRankGame } from '@/services/game/type'
import { TeamUtil } from '@/utils/team'
import classNames from 'classnames'
import React from 'react'

type Props = {
  title: string
  rank: TeamRankGame[]
  Icon?: React.ReactNode
  className?: string
}

export default function CoinSummary({ title, rank, Icon, className }: Props) {
  return (
    <div
      className={classNames(
        'relative bg-[#EFEFF0E5] bg-opacity-90 text-[#003781] rounded border-[3px] border-[#003781]',
        className
      )}
    >
      <div className="bg-[#003781] w-2/5 text-white pl-2 pr-4 uppercase py-1 min-w-28 font-medium rounded-br-full text-sm flex items-center justify-between gap-2">
        {title}
        {Icon}
      </div>

      <ul className="grid grid-cols-5 text-center w-full text-2xl font-bold pt-2 pb-2 [&>*:last-child]:border-r-0">
        {rank.map(({ teamId, totalValue }) => (
          <li
            className="border-r border-r-[#003781]"
            key={teamId}
            style={{ color: TeamUtil.getTeamColor(teamId) }}
          >
            {totalValue}
          </li>
        ))}
      </ul>
    </div>
  )
}
