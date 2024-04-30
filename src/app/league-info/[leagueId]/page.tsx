import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import Player, { IPlayer } from "@/app/models/Player";
import Rule, { IRule } from "@/app/models/Rule";
import { IUser } from "@/app/models/User";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteLeague from "./DeleteLeague";

async function getLeagueInfo(leagueId: ObjectId) {
  await dbConnect();
  await Player.find({});
  await Rule.find({});
  const leagueInfo = await League.findOne({ _id: leagueId })
    .populate("moderators")
    .populate("rules")
    .populate("players");
  return leagueInfo;
}

async function deleteLeague(leagueId: ObjectId) {
  "use server";
  await dbConnect();
  await League.deleteOne({ _id: leagueId });
  redirect(`/dashboard`);
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
        <Link href={`/edit-rules/${params.leagueId}`}>Edit Rules</Link>
        {leagueInfo.players.length > 0 && <p>Players:</p>}
        {leagueInfo.players.map((player: IPlayer) => {
          return (
            <div key={player._id}>
              <p>{player.name}</p>
            </div>
          );
        })}
        <Link href={`/edit-players/${params.leagueId}`}>Edit Players</Link>
        <DeleteLeague leagueId={params.leagueId} deleteLeague={deleteLeague} />
      </div>
    </>
  );
}
