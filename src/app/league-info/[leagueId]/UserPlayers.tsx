import { ILeague } from "@/app/models/League";
import { IUser } from "@/app/models/User";
import { ILeagueSelections } from "@/app/models/LeagueSelections";
import { IPlayer } from "@/app/models/Player";
import React from "react";

export default function UserPlayers({
  leagueInfo,
  participant,
}: {
  leagueInfo: ILeague;
  participant: IUser;
}) {
  const leaguePlayers = participant.leagues.filter(
    (league: ILeagueSelections) => {
      return league.league._id.toString() === leagueInfo._id.toString();
    }
  )[0]?.players;
  return (
    <div className="flex flex-wrap gap-3 ">
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
  );
}
