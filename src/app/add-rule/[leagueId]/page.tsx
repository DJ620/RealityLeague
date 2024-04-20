import dbConnect from "@/app/lib/dbConnect";
import Rule, { IRule } from "@/app/models/Rule";
import League from "@/app/models/League";
import { ObjectId } from "mongoose";

async function addRuleToDB(rules: IRule[], leagueMongoId: ObjectId) {
  "use server";
  await dbConnect();
  const newRules = await Rule.insertMany(rules);
  const ruleIds = newRules.map((rule: IRule) => rule._id);
  const updatedLeague = await League.findOneAndUpdate(
    { _id: leagueMongoId },
    { $push: { rules: { $each: ruleIds } } }
  );
  return updatedLeague;
}

export default async function AddRule({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
    
}
