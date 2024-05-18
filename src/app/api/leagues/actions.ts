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
    .populate("requests");
  return league;
}

export async function addLeague(league: string, userId: ObjectId) {
  "use server";
  await dbConnect();
  const newLeague = await League.create({
    name: league,
    moderators: [userId]
  });
  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { leaguesModerating: newLeague._id } }
  );
  return newLeague._id.toString();
}

export async function deleteLeague(leagueId: ObjectId) {
  "use server";
  await dbConnect();
  const deleted = await League.deleteOne({ _id: leagueId });
  return deleted;
}

export async function requestToJoinLeague(
  userId: string | undefined,
  leagueId: ObjectId
) {
  "use server";
  await dbConnect();
  const user = await User.findOneAndUpdate(
    { userId: userId },
    { $push: { pendingLeagues: leagueId } }
  );
  const league = await League.findOneAndUpdate(
    { _id: leagueId },
    { $push: { requests: user._id } }
  );
  return league;
}

export async function acceptUserToLeague(userId: ObjectId, leagueId: ObjectId) {
  "use server";
  await dbConnect();
  await User.findOneAndUpdate(
    { _id: userId },
    {
      $pull: { pendingLeagues: leagueId },
      $push: { leagues: leagueId },
    }
  );
  const league = await League.findOneAndUpdate(
    { _id: leagueId },
    {
      $pull: { requests: userId },
      $push: { participants: userId },
    }
  );
  return league;
}
