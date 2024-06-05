import { IEpisode } from "@/app/models/Episode";
import { ILeagueSelections } from "@/app/models/LeagueSelections";
import { IPlayer } from "@/app/models/Player";
import { IScore } from "@/app/models/Score";
import { IUser } from "@/app/models/User";
import React from "react";

export default function TotalPoints({
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
  const episodeTotals = episodes.map((episode: IEpisode) => {
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
  const grandTotal = episodeTotals
    .map((episodeTotal: any) => episodeTotal.totalScore)
    .reduce((a: any, b: any) => a + b);
  return (
    <div className="border-t border-blue-500">
      <p className="flex items-center justify-center h-10 pl-5 pr-4 text-center border-l-2 border-l-yellow-400 min-w-20">
        {grandTotal}
      </p>
    </div>
  );
}
