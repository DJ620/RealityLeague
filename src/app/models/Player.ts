import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  isActive: boolean;
}

const playerSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Player =
  mongoose.models.Player || mongoose.model<IPlayer>("Player", playerSchema);

export default Player;
