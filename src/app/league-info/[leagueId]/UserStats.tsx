import { IEpisode } from "@/app/models/Episode";
import { ILeagueSelections } from "@/app/models/LeagueSelections";
import { IPlayer } from "@/app/models/Player";
import { IScore } from "@/app/models/Score";
import { IUser } from "@/app/models/User";
import { ObjectId } from "mongoose";
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
      {/* <p className="mr-10 font-extrabold text-yellow-400 border-r min-w-36">
        {participant.username}
      </p> */}
      {/* <div className="mr-10 border-r min-w-64">
        <div className="flex flex-wrap gap-3">
          {leaguePlayers
            .sort((a: IPlayer, b: IPlayer) => a.name.localeCompare(b.name))
            .map((player: IPlayer, index: number) => {
              return (
                <div key={player._id} className="flex gap-3">
                  <p
                    className={`font-bold ${
                      player.isActive ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {player.name}
                  </p>
                  {index < leaguePlayers.length - 1 && <p>|</p>}
                </div>
              );
            })}
        </div>
      </div> */}
      <div className="flex pt-2 border-t border-blue-500">
        {episodeTotals.map((total: any, index: number) => {
          return (
            <p
              key={total.episode}
              className={`text-center pr-4 mr-5 mb-2 ${
                index == 0 ? "pl-5 min-w-[4.5rem] border-r" : index == episodeTotals.length - 1 ? "min-w-14" : "min-w-14 border-r"
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
