import dbConnect from "@/app/lib/dbConnect";
import Rule, { IRule } from "@/app/models/Rule";
import League from "@/app/models/League";
import { ObjectId } from "mongoose";
import RulesForm from "./RuleForm";
import DeleteRule from "./DeleteRule";

type RuleType = {
  rule: string;
  value: number;
};

export default async function AddRule({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  async function addRuleToDB(rule: RuleType, leagueMongoId: ObjectId) {
    "use server";
    await dbConnect();
    const newRule = await Rule.create(rule);
    const updatedLeague = await League.findOneAndUpdate(
      { _id: leagueMongoId },
      { $push: { rules: newRule._id } }
    );
    return updatedLeague;
  }

  async function getRules() {
    "use server";
    await dbConnect();
    await Rule.find({});
    const league = await League.findOne({ _id: params.leagueId }).populate({
      path: "rules",
    });
    return league.rules;
  }

  async function deleteRule(ruleId: ObjectId) {
    "use server";
    await dbConnect();
    const deletedRule = await Rule.deleteOne({ _id: ruleId });
    return deletedRule;
  }

  const existingRules = await getRules();
  
  return (
    <>
      <p className="text-4xl mb-5">Create New Rule</p>
      <RulesForm addRuleToDB={addRuleToDB} leagueId={params.leagueId} />
      {existingRules?.length > 0 && <p>Current Rules</p>}
      {existingRules.map((rule: IRule) => {
        return (
          <div key={rule._id}>
            <p>{rule.rule}</p>
            <p>Point value: {rule.value}</p>
            <DeleteRule ruleId={rule._id.toString()} deleteRule={deleteRule} />
          </div>
        );
      })}
    </>
  );
}
