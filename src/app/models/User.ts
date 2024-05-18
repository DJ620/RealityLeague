import mongoose, { Document, Schema } from "mongoose";
import { ILeague } from "./League";
import { ILeagueSelections } from "./LeagueSelections";
export interface IUser extends Document {
  userId: string;
  username: string;
  leagues: ILeagueSelections[];
  leaguesModerating: ILeague[];
  pendingLeagues: ILeague[];
}

const userSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  leagues: [
    {
      type: Schema.Types.ObjectId,
      ref: "LeagueSelections",
    },
  ],
  leaguesModerating: [
    {
      type: Schema.Types.ObjectId,
      ref: "League",
    },
  ],
  pendingLeagues: [
    {
      type: Schema.Types.ObjectId,
      ref: "League",
    },
  ],
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
