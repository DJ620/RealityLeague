import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
    name: string;
}

const playerSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Player = mongoose.models.Player || mongoose.model<IPlayer>("Player", playerSchema);

export default Player;