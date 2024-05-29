import dbConnect from "@/app/lib/dbConnect";
import Episode from "@/app/models/Episode";
import League, { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";

export async function addEpisode(
  leagueId: ObjectId,
  number: number,
) {
  "use server";
  await dbConnect();
  const newEpisode = await Episode.create({
    number,
    score: [],
  });
  const updatedLeague = await League.findOneAndUpdate(
    { _id: leagueId },
    { $push: { episodes: newEpisode._id } }
  );
  return updatedLeague;
}
