import dbConnect from "@/app/lib/dbConnect";
import Rule from "@/app/models/Rule";
import League from "@/app/models/League";
import { ObjectId } from "mongoose";

export async function addRule(rule: {rule: String; value: number}, leagueMongoId: ObjectId) {
    "use server";
    await dbConnect();
    const newRule = await Rule.create(rule);
    const updatedLeague = await League.findOneAndUpdate(
      { _id: leagueMongoId },
      { $push: { rules: newRule._id } }
    );
    return updatedLeague;
};

export async function deleteRule(ruleId: ObjectId) {
  "use server";
  await dbConnect();
  const deletedRule = await Rule.deleteOne({ _id: ruleId });
  return deletedRule;
}
