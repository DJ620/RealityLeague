import { ILeagueSelections } from "@/app/models/LeagueSelections";
import { IPlayer } from "@/app/models/Player";
import { IUser } from "@/app/models/User";
import { ObjectId } from "mongoose";
import React from "react";

export default function UserStats({
  participant,
  leagueId,
}: {
  participant: IUser;
  leagueId: string;
}) {
  const leaguePlayers = participant.leagues.filter(
    (league: ILeagueSelections) => {
      return league.league._id.toString() === leagueId;
    }
  )[0]?.players;
  return (
    <div className="flex">
      <p className="font-extrabold text-yellow-400 w-36 mr-10 border-r">
        {participant.username}
      </p>
      <div className="w-64 mr-10 border-r">
        <div className="flex gap-3">
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
      </div>
      <p className="">Score goes here</p>
    </div>
  );
}
