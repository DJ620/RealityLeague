import { getLeagueInfo } from "@/app/api/leagues/actions";
import { IPlayer } from "@/app/models/Player";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import React from "react";

export default async function SelectPlayers({
  params,
}: {
  params: { userId: string; leagueId: ObjectId };
}) {
  let loading = true;
  const leagueInfo = await getLeagueInfo(params.leagueId);
  console.log(leagueInfo.players);
  loading = false;
  return (
    <>
      <Loader loading={loading} />
      <div>
        <h1 className="text-4xl">Select players for {leagueInfo.name}</h1>
        <select name="players" id="player-select" className="text-black p-1 w-52">
          {leagueInfo.players.map((player: IPlayer) => {
            return (
              <option key={player._id} value={player.name}>
                {player.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
