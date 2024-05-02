import { IPlayer } from "@/app/models/Player";
import { IRule } from "@/app/models/Rule";
import { IUser } from "@/app/models/User";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import Link from "next/link";
import DeleteLeague from "./DeleteLeague";
import { getLeagueInfo, deleteLeague } from "@/app/api/leagues/actions";
import { currentUser } from "@clerk/nextjs";

export default async function LeagueInfo({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  let loading = true;
  const user = await currentUser();
  const leagueInfo = await getLeagueInfo(params.leagueId);
  const moderators = leagueInfo.moderators.map(
    (moderator: IUser) => moderator.username
  );
  const isModerator = moderators.includes(user?.username);
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
        {leagueInfo.participants.length > 0 && <p>Participants:</p>}
        {leagueInfo.participants.map((participant: IUser) => {
          return (
            <div key={participant._id}>
              <p>{participant.username}</p>
            </div>
          );
        })}
        <div>
          {leagueInfo.rules.length > 0 && <p>Rules:</p>}
          {leagueInfo.rules.map((rule: IRule) => {
            return (
              <div key={rule._id}>
                <p>Rule: {rule.rule}</p>
                <p>Point value: {rule.value}</p>
              </div>
            );
          })}
          {isModerator && (
            <Link href={`/edit-rules/${params.leagueId}`}>Edit Rules</Link>
          )}
        </div>
        <div>
          {leagueInfo.players.length > 0 && <p>Players:</p>}
          {leagueInfo.players.map((player: IPlayer) => {
            return (
              <div key={player._id}>
                <p>{player.name}</p>
              </div>
            );
          })}
          {isModerator && (
            <Link href={`/edit-players/${params.leagueId}`}>Edit Players</Link>
          )}
        </div>
        {isModerator && (
          <DeleteLeague
            leagueId={params.leagueId}
            deleteLeague={deleteLeague}
          />
        )}
      </div>
    </>
  );
}
