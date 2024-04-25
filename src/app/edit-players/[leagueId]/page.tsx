import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import Player, { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import PlayerForm from "./PlayerForm";
import DeletePlayer from "./DeletePlayer";
import Link from "next/link";

export default async function EditPlayers({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  async function addPlayer(player: string, leagueMongoId: ObjectId) {
    "use server";
    await dbConnect();
    const newPlayer = await Player.create({ name: player });
    const updatedLeague = await League.findOneAndUpdate(
      { _id: leagueMongoId },
      { $push: { players: newPlayer._id } }
    );
    return updatedLeague;
  }

  async function deletePlayer(playerId: ObjectId) {
    "use server";
    await dbConnect();
    const deletedPlayer = await Player.deleteOne({ _id: playerId });
    return deletedPlayer;
  }

  async function getLeagueInfo() {
    "use server";
    await dbConnect();
    await Player.find({});
    const league = await League.findOne({ _id: params.leagueId }).populate(
      "players"
    );
    return league;
  }

  const leagueInfo = await getLeagueInfo();
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
