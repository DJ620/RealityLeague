import mongoose, { Document, Schema } from "mongoose";
import { IRule } from "./Rule";
import { IUser } from "./User";
export interface ILeague extends Document {
  name: string;
  rules: IRule[];
  moderators: IUser[];
  participants: IUser[];
  requests: IUser[];
}

const leagueSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rule",
    },
  ],
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player"
    }
  ],
  moderators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const League =
  mongoose.models.League || mongoose.model<ILeague>("League", leagueSchema);

export default League;
