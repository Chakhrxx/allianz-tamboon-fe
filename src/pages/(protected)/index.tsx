import BarTrack from "@/components/BarTrack";
import Goal from "@/assets/images/goal.png";
import { Team } from "@/constants/team";
import TeamBadge from "@/components/TeamBadge";
import CoinSummary from "@/components/CoinSummary";
import PageTitle from "@/components/PageTitle";
import LiveIcon from "@/assets/svgs/live.svg?react";
import { Link } from "react-router-dom";
import BgCircleImage from "@/assets/images/bg-circle.png";
import Logo from "@/assets/images/logo.png";

import { useQuery } from "react-query";
import { gameService } from "@/services/game";
import GameIcon from "@/components/GameIcon";
import { useMemo } from "react";
import { useActivityState } from "@/hooks/useActivityState";
import Banner from "@/components/Banner";

const iconSize = { width: 20, height: 20 };
const MAX_SCORE = 10000;

function HomePage() {
  const { isActivityEnabled } = useActivityState({
    collectionId: "showActivityScore",
  });
  const { data: teamRankGameScores } = useQuery(
    "team-rank-game-scores",
    gameService.getAllTeamRankGameScore
  );

  const { data: teamRankScores } = useQuery(
    "team-rank-scores",
    gameService.getAllTeamRankScore
  );

  const sortedTeamRankScores = useMemo(() => {
    if (!teamRankScores) return [];
    const sortedTeamRankScores = [...teamRankScores].sort(
      (a, b) => b.totalScore - a.totalScore
    );
    return sortedTeamRankScores;
  }, [teamRankScores]);

  const getRanking = (teamId: Team) => {
    const idx = sortedTeamRankScores.findIndex(
      (teamRankScore) => teamRankScore.teamId === teamId
    );
    return idx + 1;
  };

  return (
    <>
      <Banner />
      <div className="relative min-h-screen">
        <div className="relative z-10">
          {isActivityEnabled("live") && (
            <Link className="block text-right pt-4 pr-4 -mb-8" to="/live">
              <LiveIcon className="inline-block" />
            </Link>
          )}

          <PageTitle className="pl-3">Scoreboard</PageTitle>
          {!isActivityEnabled("FollowLive") ? (
            <div className="flex">
              <ul className="[&>*:last-child]:border-b-2 w-full">
                {teamRankScores?.map((teamRankScore) => (
                  <BarTrack
                    key={teamRankScore.teamId}
                    team={teamRankScore.teamId}
                    score={teamRankScore.totalScore}
                    maxScore={MAX_SCORE}
                    ranking={getRanking(teamRankScore.teamId)}
                  />
                ))}
              </ul>
              <img src={Goal} alt="Goal" className="w-6 h-auto" />
            </div>
          ) : (
            <div className="space-y-4 py-6">
              <img src={Logo} alt="Logo" className="w-24 mx-auto" />
              <p className="text-center font-semibold leading-5 text-lg">
                Follow the competition results together
                <br />
                on the live screen.
              </p>
            </div>
          )}

          <div className="p-4 space-y-4">
            {!isActivityEnabled("FollowLive") && (
              <div className="flex justify-between items-center gap-4">
                <TeamBadge team={Team.BLUE} />
                <TeamBadge team={Team.YELLOW} />
                <TeamBadge team={Team.BLACK} />
                <TeamBadge team={Team.GREEN} />
                <TeamBadge team={Team.RED} />
              </div>
            )}

            {teamRankGameScores?.map(
              (teamRankGameScore) =>
                isActivityEnabled(
                  teamRankGameScore.game.firebaseCollectionName
                ) && (
                  <CoinSummary
                    rank={teamRankGameScore.rank}
                    key={teamRankGameScore.game.id}
                    title={teamRankGameScore.game.name}
                    Icon={
                      <GameIcon
                        game={teamRankGameScore.game.id}
                        {...iconSize}
                      />
                    }
                  />
                )
            )}
          </div>
        </div>

        <img
          className="absolute bottom-0 w-full"
          src={BgCircleImage}
          alt="Circle Image"
        />
      </div>
    </>
  );
}

export default HomePage;
