import dbConnect from "@/app/lib/dbConnect";
import Episode from "@/app/models/Episode";
import Score from "@/app/models/Score";
import { ObjectId } from "mongoose";

export async function addScore(ruleId: string, playerId: string, episodeId: string) {
    "use server";
    await dbConnect();
    const newScore = await Score.create({
        rule: ruleId,
        player: playerId
    });
    const updatedEpisode = await Episode.findOneAndUpdate(
        { _id: episodeId },
        { $push: { score: newScore._id }}
    );
    return updatedEpisode;
}