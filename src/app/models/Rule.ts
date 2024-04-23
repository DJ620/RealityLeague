import mongoose, { Document, Schema } from "mongoose";

export interface IRule extends Document {
  rule: string;
  value: number;
}

const ruleSchema: Schema = new mongoose.Schema({
  rule: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 1,
  },
});

const Rule = mongoose.models.Rule || mongoose.model<IRule>("Rule", ruleSchema);

export default Rule;
