import { GameSummary } from '@/services/auth/type'
import SportCoin from './SportCoin'
import GameIcon from '@/components/GameIcon'

type Props = {
  data: GameSummary
}

function MachineGameSummary({ data }: Props) {
  return (
    <div className="border-2 border-primary bg-[#F3F3F3] rounded w-fit mx-auto pb-2">
      <div className="bg-primary max-w-20 text-xs p-1 text-left rounded-br-full text-white">
        {data.game.name}
      </div>
      <div className="flex justify-center items-center gap-5 p-2">
        <SportCoin
          key={data.game.id}
          className="!border-0 w-14 h-14"
          status="WIN"
        >
          <GameIcon game={data.game.id} width={40} height={40} />
        </SportCoin>
      </div>
      <div className="text-5xl">{data.game.sumScore}</div>
    </div>
  )
}

export default MachineGameSummary
