import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import Player, { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import PlayerForm from "./PlayerForm";
import DeletePlayer from "./DeletePlayer";
import Link from "next/link";
import { getLeagueInfo } from "@/app/api/leagues/actions";
import {
  addPlayer,
  changePlayerStatus,
  deletePlayer,
} from "@/app/api/players/actions";
import PlayerInfo from "./PlayerInfo";

export default async function EditPlayers({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  const leagueInfo = await getLeagueInfo(params.leagueId);
  const existingPlayers = leagueInfo.players;

  return (
    <>
      <Link
        href={`/league-info/${params.leagueId}`}
        className="mb-5 text-4xl font-extrabold text-blue-500 hover:text-yellow-400"
      >
        {leagueInfo.name}
      </Link>

      <div className="pb-8 mb-5 border-b border-b-yellow-400">
        <p className="my-5 text-2xl">Add New Player </p>
        <PlayerForm addPlayer={addPlayer} leagueId={params.leagueId} />
      </div>

      {existingPlayers?.length > 0 && (
        <p className="mt-5 mb-5 text-2xl text-center">Current Players</p>
      )}
      <div className="flex flex-wrap justify-center gap-5">
        {existingPlayers
          .sort((a: IPlayer, b: IPlayer) => a.name.localeCompare(b.name))
          .map((player: IPlayer) => {
            return (
              <PlayerInfo
                key={player._id}
                playerName={player.name}
                playerId={player._id.toString()}
                isActive={player.isActive}
                changePlayerStatus={changePlayerStatus}
                deletePlayer={deletePlayer}
              />
            );
          })}
      </div>
    </>
  );
}
