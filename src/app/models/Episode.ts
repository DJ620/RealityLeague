import mongoose, { Document, Schema } from "mongoose";
import { IScore } from "./Score";

export interface IEpisode extends Document {
  number: number;
  score: IScore[];
}

const episodeSchema: Schema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  score: [
    {
      type: Schema.Types.ObjectId,
      ref: "Score",
    },
  ]
});

const Episode =
  mongoose.models.Episode || mongoose.model<IEpisode>("Episode", episodeSchema);

export default Episode;
