import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import Player, { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import PlayerForm from "./PlayerForm";
import DeletePlayer from "./DeletePlayer";
import Link from "next/link";
import { getLeagueInfo } from "@/app/api/leagues/actions";
import { addPlayer, deletePlayer } from "@/app/api/players/actions";

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
      {existingPlayers?.length > 0 && <p>Current Players</p>}
      {existingPlayers.map((player: IPlayer) => {
        return (
          <div key={player._id}>
            <p>{player.name}</p>
            <DeletePlayer
              playerId={player._id.toString()}
              deletePlayer={deletePlayer}
            />
          </div>
        );
      })}
    </>
  );
}
