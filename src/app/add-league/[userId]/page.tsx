"use server";
import { redirect } from "next/navigation";
import dbConnect from "../../lib/dbConnect";
import League from "../../models/League";
import User from "../../models/User";
import LeagueForm from "./LeagueForm";
import { ObjectId } from "mongoose";

export default async function AddLeague({
  params,
}: {
  params: {userId: ObjectId};
}) {
  async function addLeagueToDB(league: string) {
    "use server";
    await dbConnect();
    const newLeague = await League.create({
      name: league,
      moderators: [params.userId],
    });
    await User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { leaguesModerating: newLeague._id } }
    );
    const leagueId = newLeague._id.toString();
    redirect(`/league-info/${leagueId}`);
  };

  return <LeagueForm createLeague={addLeagueToDB} />;
}
