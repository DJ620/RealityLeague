"use server";
import dbConnect from "../lib/dbConnect";
import League from "../models/League";
import User from "../models/User";
import LeagueForm from "./LeagueForm";
import { currentUser } from "@clerk/nextjs";

async function addLeagueToDB(league: string) {
  "use server";
  const user = await currentUser();
  await dbConnect();
  const userMongoId = await User.findOne({ userId: user?.id });
  const newLeague = await League.create({
    name: league,
    moderators: [userMongoId._id],
  });
  await User.findOneAndUpdate(
    {_id: userMongoId._id},
    {$push: {leaguesModerating: newLeague._id}}
  );
}

export default async function AddLeague() {
  return <LeagueForm createLeague={addLeagueToDB} />;
}
