import mongoose, { Document, Schema } from "mongoose";
import { IRule } from "./Rule";
import { IUser } from "./User";
import { IPlayer } from "./Player";
export interface ILeague extends Document {
  name: string;
  rules: IRule[];
  players: IPlayer[];
  numberOfSelections: number;
  moderators: IUser[];
  participants: IUser[];
  requests: IUser[];
  isPrivate: boolean;
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
      ref: "Player",
    },
  ],
  numberOfSelections: {
    type: Number,
    required: true,
  },
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
      ref: "User",
    },
  ],
  isPrivate: {
    type: Boolean,
    default: false,
  },
});

const League =
  mongoose.models.League || mongoose.model<ILeague>("League", leagueSchema);

export default League;
