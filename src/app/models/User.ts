import mongoose, { Document, Schema } from "mongoose";
import { ILeague } from "./League";
export interface IUser extends Document {
  userId: string;
  username: string;
  leagues: ILeague[];
  leaguesModerating: ILeague[];
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
      ref: "League",
    },
  ],
  leaguesModerating: [
    {
      type: Schema.Types.ObjectId,
      ref: "League",
    },
  ],
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
