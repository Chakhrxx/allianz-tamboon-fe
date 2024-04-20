import Coin from '@/components/Coin'

import SportCoin from './components/SportCoin'
import Button from '@/components/Button'
// import QuizSummary from './components/QuizSummary'
import { Link } from 'react-router-dom'
import { useProfile } from '@/hooks/useProfile'
import GameIcon from '@/components/GameIcon'
import { useActivityState } from '@/hooks/useActivityState'
import MachineGameSummary from './components/MachineGameSummary'

function ProfilePage() {
  const { isActivityEnabled } = useActivityState({
    collectionId: 'showActivityScore'
  })
  const { data: profile } = useProfile()

  return (
    <div className="relative z-10 text-center space-y-5 pb-10">
      <Coin className="mx-auto w-28 h-28" points={profile?.coins} />
      <div className="mx-auto max-w-80 space-y-2">
        <div className="font-bold">Daily Sports Experience</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {profile?.gameSummary.map(
            ({ game, state }) =>
              isActivityEnabled(game.firebaseCollectionName) && (
                <SportCoin key={game.id} className="w-20 h-20" status={state}>
                  <GameIcon game={game.id} width={40} height={40} />
                </SportCoin>
              )
          )}
        </div>
      </div>
      {/* {isActivityEnabled('AllQuiz') && (
        <QuizSummary data={profile?.quizSummary} />
      )} */}
      <div className="grid grid-cols-3">
        {profile?.dailyGameSummary.map((data) => (
          <MachineGameSummary key={data.game.id} data={data} />
        ))}
      </div>
      <Link className="block" to="qr">
        <Button className="w-full bg-opacity-90">MY QR</Button>
      </Link>
    </div>
  )
}

export default ProfilePage
