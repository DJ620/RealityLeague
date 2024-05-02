import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import User from "@/app/models/User";
import Rule from "@/app/models/Rule";
import Player from "@/app/models/Player";
import { ObjectId } from "mongoose";

export async function getLeagueInfo(leagueId: ObjectId) {
  "use server";
  await dbConnect();
  await Rule.find({});
  await Player.find({});
  const league = await League.findOne({ _id: leagueId })
    .populate("moderators")
    .populate("rules")
    .populate("players")
    .populate("participants")
  return league;
}

export async function addLeague(league: string, userId: ObjectId) {
  "use server";
  await dbConnect();
  const newLeague = await League.create({
    name: league,
    moderators: [userId],
    participants: [userId],
  });
  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { leaguesModerating: newLeague._id, leagues: newLeague._id } }
  );
  return newLeague._id.toString();
}

export async function deleteLeague(leagueId: ObjectId) {
  "use server";
  await dbConnect();
  const deleted = await League.deleteOne({ _id: leagueId });
  return deleted;
}
