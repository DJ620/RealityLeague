import dbConnect from "@/app/lib/dbConnect";
import Player from "@/app/models/Player";
import League from "@/app/models/League";
import { ObjectId } from "mongoose";

export async function addPlayer(player: string, leagueMongoId: ObjectId) {
  "use server";
  await dbConnect();
  const newPlayer = await Player.create({ name: player });
  const updatedLeague = await League.findOneAndUpdate(
    { _id: leagueMongoId },
    { $push: { players: newPlayer._id } }
  );
  return updatedLeague;
}

export async function deletePlayer(playerId: ObjectId) {
  "use server";
  await dbConnect();
  const deletedPlayer = await Player.deleteOne({ _id: playerId });
  return deletedPlayer;
}

export async function changePlayerStatus(
  playerId: ObjectId,
  isActive: boolean
) {
  "use server";
  await dbConnect();
  const updatedPlayer = await Player.findOneAndUpdate(
    { _id: playerId },
    { isActive }
  );
  return updatedPlayer.name;
}
