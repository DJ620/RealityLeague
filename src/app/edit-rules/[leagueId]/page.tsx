import dbConnect from "@/app/lib/dbConnect";
import Rule, { IRule } from "@/app/models/Rule";
import League from "@/app/models/League";
import { ObjectId } from "mongoose";
import RulesForm from "./RuleForm";
import DeleteRule from "./DeleteRule";
import Link from "next/link";

type RuleType = {
  rule: string;
  value: number;
};

export default async function EditRules({
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

  async function getLeagueInfo() {
    "use server";
    await dbConnect();
    await Rule.find({});
    const league = await League.findOne({ _id: params.leagueId }).populate({
      path: "rules",
    });
    return league;
  }

  async function deleteRule(ruleId: ObjectId) {
    "use server";
    await dbConnect();
    const deletedRule = await Rule.deleteOne({ _id: ruleId });
    return deletedRule;
  }

  const leagueInfo = await getLeagueInfo();
  const existingRules = leagueInfo.rules;

  return (
    <>
      <p className="text-4xl mb-5">
        Create New Rule for{" "}
        <Link
          href={`/league-info/${params.leagueId}`}
          className="text-blue-500 hover:text-yellow-400"
        >
          {leagueInfo.name}
        </Link>
      </p>
      <RulesForm addRuleToDB={addRuleToDB} leagueId={params.leagueId} />
      {existingRules?.length > 0 && <p>Current Rules</p>}
      {existingRules.map((rule: IRule) => {
        return (
          <div key={rule._id}>
            <p>{rule.rule}</p>
            <p>Point value: {rule.value}</p>
          </div>
        );
      })}
    </>
  );
}
