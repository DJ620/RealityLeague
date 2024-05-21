import mongoose, { Document, Schema } from "mongoose";
import { ILeague } from "./League";
import { IPlayer } from "./Player";
import { IUser } from "./User";
export interface ILeagueSelections extends Document {
  user: IUser;
  league: ILeague;
  players: IPlayer[];
}

const leagueSelectionsSchema: Schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: "League",
    required: true
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const LeagueSelections =
  mongoose.models.LeagueSelections ||
  mongoose.model<ILeagueSelections>("LeagueSelections", leagueSelectionsSchema);

export default LeagueSelections;
