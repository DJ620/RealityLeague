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
      <p className="text-4xl mb-5">
        Create New Rule for{" "}
        <Link
          href={`/league-info/${params.leagueId}`}
          className="text-blue-500 hover:text-yellow-400"
        >
          {leagueInfo.name}
        </Link>
      </p>
      <RulesForm addRuleToDB={addRule} leagueId={params.leagueId} />
      {existingRules?.length > 0 && <p>Current Rules</p>}
      {existingRules.map((rule: IRule) => {
        return (
          <div key={rule._id}>
            <p>{rule.rule}</p>
            <p>Point value: {rule.value}</p>
            <DeleteRule ruleId={rule._id.toString()} deleteRule={deleteRule}/>
          </div>
        );
      })}
    </>
  );
}
