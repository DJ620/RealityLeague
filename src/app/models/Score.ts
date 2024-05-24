import mongoose, { Document, Schema } from "mongoose";
import { IRule } from "./Rule";
import { IPlayer } from "./Player";

export interface IScore extends Document {
  rule: IRule;
  player: IPlayer;
}

const scoreSchema: Schema = new mongoose.Schema({
  rule: {
    type: Schema.Types.ObjectId,
    ref: "Rule",
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },
});

const Score =
  mongoose.models.Score || mongoose.model<IScore>("Score", scoreSchema);

export default Score;
