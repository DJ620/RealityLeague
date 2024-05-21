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
  )[0].players;
  return (
    <>
      <p>{participant.username}</p>
      <div className="pl-5 border-y">
        {leaguePlayers.map((player: IPlayer) => {
          return <p key={player._id}>{player.name}</p>;
        })}
      </div>
    </>
  );
}
