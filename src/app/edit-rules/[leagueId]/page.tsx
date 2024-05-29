import { IRule } from "@/app/models/Rule";
import { ObjectId } from "mongoose";
import RulesForm from "./RuleForm";
import DeleteRule from "./DeleteRule";
import Link from "next/link";
import { addRule, deleteRule } from "@/app/api/rules/actions";
import { getLeagueInfo } from "@/app/api/leagues/actions";

export default async function EditRules({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  const leagueInfo = await getLeagueInfo(params.leagueId);
  const existingRules = leagueInfo.rules;

  return (
    <>
      <Link
        href={`/league-info/${params.leagueId}`}
        className="text-blue-500 hover:text-yellow-400 text-4xl"
      >
        {leagueInfo.name}
      </Link>
      
      <div className="mb-5 pb-8 border-b border-yellow-400">
        <p className="text-2xl my-5">Create New Rule</p>
        <RulesForm addRuleToDB={addRule} leagueId={params.leagueId} />
      </div>
      {existingRules?.length > 0 && (
        <p className="text-2xl mb-5">Current Rules</p>
      )}
      <div className="w-fit">
        {existingRules.map((rule: IRule) => {
          return (
            <div key={rule._id} className="flex border-t border-blue-500 py-2 px-5">
              <p className="w-80 font-bold text-yellow-400">{rule.rule}</p>
              <p className="w-40">Point value: {rule.value}</p>
              <DeleteRule
                ruleId={rule._id.toString()}
                deleteRule={deleteRule}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
