import { IEpisode } from "@/app/models/Episode";
import { ILeagueSelections } from "@/app/models/LeagueSelections";
import { IPlayer } from "@/app/models/Player";
import { IScore } from "@/app/models/Score";
import { IUser } from "@/app/models/User";
import React from "react";

export default function UserStats({
  participant,
  leagueId,
  episodes,
}: {
  participant: IUser;
  leagueId: string;
  episodes: IEpisode[];
}) {
  const leaguePlayers = participant.leagues.filter(
    (league: ILeagueSelections) => {
      return league.league._id.toString() === leagueId;
    }
  )[0]?.players;
  const episodeTotals = episodes.map((episode: IEpisode, index: number) => {
    let totalScore = 0;
    episode.score.forEach((score: IScore) => {
      if (
        leaguePlayers
          .map((player: IPlayer) => player._id.toString())
          .includes(score.player._id.toString())
      ) {
        totalScore += score.rule.value;
      }
    });
    return { episode: episode.number, totalScore };
  });
  return (
    <div className="flex">
      <div className="flex border-t border-blue-500">
        {episodeTotals.map((total: any, index: number) => {
          return (
            <p
              key={total.episode}
              className={`text-center h-10 flex justify-center items-center pr-4 mr-5 ${
                index == 0
                  ? "pl-5 min-w-[4.5rem] border-r"
                  : index == episodeTotals.length - 1
                  ? "min-w-14"
                  : "min-w-14 border-r"
              }`}
            >
              {total.totalScore}
            </p>
          );
        })}
      </div>
    </div>
  );
}
