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
      <div className="flex justify-center">
        <div>
          <div className="flex justify-center">
            <Link
              href={`/league-info/${params.leagueId}`}
              className="text-4xl font-extrabold text-blue-500 hover:text-yellow-400"
            >
              {leagueInfo.name}
            </Link>
          </div>
          <div className="mb-10">
            <p className="my-5 text-2xl">Create New Rule</p>
            <RulesForm addRuleToDB={addRule} leagueId={params.leagueId} />
          </div>
        </div>
      </div>
      <div className="mb-10 border-t border-yellow-400" />
      {existingRules?.length > 0 && (
        <p className="mb-5 text-2xl text-center">Current Rules</p>
      )}
      <div className="flex justify-center">
        <div className="w-fit">
          {existingRules.map((rule: IRule) => {
            return (
              <div
                key={rule._id}
                className="flex px-5 py-2 border-t border-blue-500"
              >
                <p className="font-bold text-yellow-400 w-80">{rule.rule}</p>
                <p className="w-40">Point value: {rule.value}</p>
                <DeleteRule
                  ruleId={rule._id.toString()}
                  deleteRule={deleteRule}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
