import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import Player, { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import PlayerForm from "./PlayerForm";

export default async function AddPlayer({
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

  async function getPlayers() {
    "use server";
    await dbConnect();
    await Player.find({});
    const league = await League.findOne({ _id: params.leagueId }).populate(
      "players"
    );
    return league.players;
  }

  const existingPlayers = await getPlayers();

  return (
    <>
      <p className="text-4xl mb-5">Add New Player</p>
      <PlayerForm addPlayer={addPlayer} leagueId={params.leagueId} />
      {existingPlayers.length > 0 && <p>Current Players</p>}
      {existingPlayers.map((player: IPlayer) => {
        return (
            <div key={player._id}>
                <p>{player.name}</p>
            </div>
        )
      })}
    </>
  );
}
