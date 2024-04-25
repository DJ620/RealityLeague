import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import Player, { IPlayer } from "@/app/models/Player";
import Rule, { IRule } from "@/app/models/Rule";
import { IUser } from "@/app/models/User";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import Link from "next/link";

async function getLeagueInfo(leagueId: any) {
  await dbConnect();
  await Player.find({});
  await Rule.find({});
  const leagueInfo = await League.findOne({ _id: leagueId })
    .populate("moderators")
    .populate("rules")
    .populate("players");
  return leagueInfo;
}

export default async function LeagueInfo({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  let loading = true;
  const leagueInfo = await getLeagueInfo(params.leagueId);
  loading = false;
  return (
    <>
      <Loader loading={loading} />
      <div>
        <p className="text-center text-4xl mb-5">{leagueInfo.name}</p>
        <p>Moderator(s):</p>
        {leagueInfo.moderators.map((moderator: IUser) => {
          return <p key={moderator._id}>{moderator.username}</p>;
        })}
        {leagueInfo.rules.length > 0 && <p>Rules:</p>}
        {leagueInfo.rules.map((rule: IRule) => {
          return (
            <div key={rule._id}>
              <p>Rule: {rule.rule}</p>
              <p>Point value: {rule.value}</p>
            </div>
          );
        })}
        {leagueInfo.players.length > 0 && <p>Players:</p>}
        {leagueInfo.players.map((player: IPlayer) => {
          return (
            <div key={player._id}>
              <p>{player.name}</p>
            </div>
          );
        })}
        <Link href={`/add-rule/${params.leagueId}`}>Add Rules</Link>
        <Link href={`/add-player/${params.leagueId}`}>Add Players</Link>
      </div>
    </>
  );
}
