import mongoose, { Document, Schema } from 'mongoose';
export interface IUser extends Document {
    userId: string;
    username: string;
}

const userSchema:Schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;