import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import Player, { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import PlayerForm from "./PlayerForm";
import DeletePlayer from "./DeletePlayer";
import Link from "next/link";
import { getLeagueInfo } from "@/app/api/leagues/actions";
import { addPlayer, changePlayerStatus, deletePlayer } from "@/app/api/players/actions";
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
      <p className="text-4xl mb-5">
        Add New Player for{" "}
        <Link
          href={`/league-info/${params.leagueId}`}
          className="text-blue-500 hover:text-yellow-400"
        >
          {leagueInfo.name}
        </Link>
      </p>
      <PlayerForm addPlayer={addPlayer} leagueId={params.leagueId} />
      {existingPlayers?.length > 0 && (
        <p className="mt-5 mb-5 text-2xl">Current Players</p>
      )}
      <div className="flex gap-5 flex-wrap">
        {existingPlayers.map((player: IPlayer) => {
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
