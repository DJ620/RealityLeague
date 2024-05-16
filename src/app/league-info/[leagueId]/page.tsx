import { IPlayer } from "@/app/models/Player";
import { IRule } from "@/app/models/Rule";
import { IUser } from "@/app/models/User";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import Link from "next/link";
import DeleteLeague from "./DeleteLeague";
import {
  getLeagueInfo,
  deleteLeague,
  requestToJoinLeague,
  acceptUserToLeague,
} from "@/app/api/leagues/actions";
import { currentUser } from "@clerk/nextjs";
import RequestToJoin from "./RequestToJoin";
import HandleRequest from "./HandleRequest";

export default async function LeagueInfo({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  let loading = true;
  const user = await currentUser();
  const leagueInfo = await getLeagueInfo(params.leagueId);
  const isModerator = leagueInfo.moderators
    .map((moderator: IUser) => moderator.username)
    .includes(user?.username);
  const isMember = leagueInfo.participants
    .map((participant: IUser) => participant.username)
    .includes(user?.username);
  const isPending = leagueInfo.requests
    .map((request: IUser) => request.username)
    .includes(user?.username);
  loading = false;

  return (
    <>
      <Loader loading={loading} />
      <div>
        <p className="text-center text-4xl mb-5">{leagueInfo.name}</p>

        <div className="mb-5">
          <p>Moderator(s):</p>
          {leagueInfo.moderators.map((moderator: IUser) => {
            return <p key={moderator._id}>{moderator.username}</p>;
          })}
        </div>

        <div>
          <div className="mb-5">
            {leagueInfo.participants.length > 0 && <p>Participants:</p>}
            {leagueInfo.participants.map((participant: IUser) => {
              return (
                <div key={participant._id}>
                  <p>{participant.username}</p>
                </div>
              );
            })}
          </div>

          <div className="mb-5">
            {leagueInfo.rules.length > 0 && <p>Rules:</p>}
            {leagueInfo.rules.map((rule: IRule) => {
              return (
                <div key={rule._id} className="flex gap-4">
                  <p className="text-blue-500 font-extrabold">
                    Rule: {rule.rule} <span className="text-white ml-3">|</span>
                  </p>
                  <p className="text-yellow-400">Point value: {rule.value}</p>
                </div>
              );
            })}
            {isModerator && (
              <Link
                href={`/edit-rules/${params.leagueId}`}
                className="text-red-400"
              >
                Edit Rules
              </Link>
            )}
          </div>

          <div className="mb-5">
            {leagueInfo.players.length > 0 && <p>Players:</p>}
            {leagueInfo.players.map((player: IPlayer) => {
              return (
                <div key={player._id}>
                  <p>{player.name}</p>
                </div>
              );
            })}
            {isModerator && (
              <Link
                href={`/edit-players/${params.leagueId}`}
                className="text-red-400"
              >
                Edit Players
              </Link>
            )}
          </div>
        </div>

        {isMember ? (
          <button className="text-red-500">Leave this league</button>
        ) : isPending ? (
          <p>Pending acceptance</p>
        ) : (
          <RequestToJoin
            userId={user?.id}
            leagueId={params.leagueId}
            leagueName={leagueInfo.name}
            requestToJoinLeague={requestToJoinLeague}
          />
        )}
        {isModerator && leagueInfo.requests.length > 0 && (
          <p>Pending Requests to Join this league:</p>
        )}
        {isModerator &&
          leagueInfo.requests.map((request: IUser) => {
            return (
              <div key={request._id} className="flex gap-5">
                <p>{request.username}</p>
                <HandleRequest
                  userId={request._id.toString()}
                  leagueId={params.leagueId}
                  acceptUserToLeague={acceptUserToLeague}
                />
              </div>
            );
          })}
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
