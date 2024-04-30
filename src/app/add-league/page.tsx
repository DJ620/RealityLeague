"use server";
import { redirect } from "next/navigation";
import dbConnect from "../lib/dbConnect";
import League from "../models/League";
import User from "../models/User";
import LeagueForm from "./LeagueForm";
import { currentUser } from "@clerk/nextjs";

export default async function AddLeague() {
  const user = await currentUser();
  async function addLeagueToDB(league: string) {
    "use server";
    await dbConnect();
    const userMongoId = await User.findOne({ userId: user?.id });
    const newLeague = await League.create({
      name: league,
      moderators: [userMongoId._id],
    });
    console.log({ newLeague });
    await User.findOneAndUpdate(
      { _id: userMongoId._id },
      { $push: { leaguesModerating: newLeague._id } }
    );
    redirect(`/league-info/${newLeague._id.toString()}`);
  }

  return <LeagueForm createLeague={addLeagueToDB} />;
}
