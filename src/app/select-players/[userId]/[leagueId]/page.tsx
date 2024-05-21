import { getLeagueInfo } from "@/app/api/leagues/actions";
import { IPlayer } from "@/app/models/Player";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import React from "react";
import PlayerSelection from "./PlayerSelection";
import Link from "next/link";
import { joinLeague } from "@/app/api/leagues/actions";
import { redirect } from "next/navigation";

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

  const joinLeagueHelper = async (players: ObjectId[]) => {
    "use server";
    await joinLeague(params.userId, params.leagueId, players);
    redirect(`/league-info/${leagueInfo._id}`);
  };

  return (
    <>
      <Loader loading={loading} />
      <div>
        <h1 className="text-4xl mb-5">
          Select {leagueInfo.numberOfSelections} players for{" "}
          <Link
            href={`/league-info/${leagueInfo._id}`}
            className="text-blue-500"
          >
            {leagueInfo.name}
          </Link>
        </h1>
        <PlayerSelection
          players={players}
          numberOfSelections={leagueInfo.numberOfSelections}
          joinLeague={joinLeagueHelper}
        />
      </div>
    </>
  );
}
