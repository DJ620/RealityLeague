import { getLeagueInfo } from "@/app/api/leagues/actions";
import { IPlayer } from "@/app/models/Player";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import React from "react";
import PlayerSelection from "./PlayerSelection";

export default async function SelectPlayers({
  params,
}: {
  params: { userId: string; leagueId: ObjectId };
}) {
  let loading = true;
  const leagueInfo = await getLeagueInfo(params.leagueId);
  const players = leagueInfo.players.map((player: IPlayer) => {
    return { _id: player._id.toString(), name: player.name };
  });
  loading = false;
  return (
    <>
      <Loader loading={loading} />
      <div>
        <h1 className="text-4xl mb-5">Select players for {leagueInfo.name}</h1>
        <PlayerSelection players={players} numberOfSelections={leagueInfo.numberOfSelections} />
      </div>
    </>
  );
}
