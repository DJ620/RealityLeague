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
  leaveLeague,
} from "@/app/api/leagues/actions";
import { currentUser } from "@clerk/nextjs";
import RequestToJoin from "./RequestToJoin";
import HandleRequest from "./HandleRequest";
import LeaveLeague from "./LeaveLeague";
import UserStats from "./UserStats";

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

        <div className="bg-slate-800 rounded-sm p-2 mb-5  outline-blue-500 outline border border-yellow-400">
          <div className="mb-5 border-b-2 pb-3 border-b-yellow-400">
            {leagueInfo.participants.length > 0 && (
              <div className="flex pb-2">
                <p className="text-xl w-36 mr-10 border-r">Participants:</p>
                <p className="text-xl w-64 mr-10 border-r">Players:</p>
                <p className="text-xl">Score:</p>
              </div>
            )}
            {leagueInfo.participants.length > 0 &&
              leagueInfo.participants.map((participant: IUser) => {
                return (
                  <div
                    key={participant._id}
                    className="border-t pt-2 border-blue-500"
                  >
                    <UserStats
                      participant={participant}
                      leagueId={leagueInfo._id.toString()}
                    />
                  </div>
                );
              })}
          </div>

          <div>
            {leagueInfo.rules.length > 0 && <p className="text-xl">Rules:</p>}
            {leagueInfo.rules.map((rule: IRule) => {
              return (
                <div key={rule._id} className="flex border-t px-5 py-2">
                  <p className="text-blue-500 font-extrabold w-[90%]">
                    {rule.rule}
                  </p>
                  <p className="text-yellow-400">Point value: {rule.value}</p>
                </div>
              );
            })}
            {isModerator && (
              <div className="border-t pt-4">
                <Link
                  href={`/edit-rules/${params.leagueId}`}
                  className="text-red-400"
                >
                  Edit Rules
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mb-5 pb-5 w-fit">
          {leagueInfo.players.length > 0 && (
            <p className="text-xl mb-1">Players:</p>
          )}
          <div className="flex gap-3">
            {leagueInfo.players
              .sort((a: IPlayer, b: IPlayer) => a.name.localeCompare(b.name))
              .map((player: IPlayer, index: number) => {
                return (
                  <div key={player._id} className="py-1 flex gap-3">
                    <p
                      className={`font-bold ${
                        player.isActive ? "text-blue-500" : "text-red-500"
                      }`}
                    >
                      {player.name}
                    </p>
                    {index < leagueInfo.players.length - 1 && <p>|</p>}
                  </div>
                );
              })}
          </div>
          {isModerator && (
            <div className="pt-4">
              <Link
                href={`/edit-players/${params.leagueId}`}
                className="text-red-400"
              >
                Edit Players
              </Link>
            </div>
          )}
        </div>

        {isMember ? (
          <LeaveLeague
            userId={user?.id}
            leagueId={params.leagueId}
            leagueName={leagueInfo.name}
            leaveLeague={leaveLeague}
          />
        ) : isPending ? (
          <p>Pending acceptance</p>
        ) : leagueInfo.isPrivate ? (
          <RequestToJoin
            userId={user?.id}
            leagueId={params.leagueId}
            leagueName={leagueInfo.name}
            requestToJoinLeague={requestToJoinLeague}
          />
        ) : (
          <Link href={`/select-players/${user?.id}/${leagueInfo._id}`}>
            Join {leagueInfo.name}
          </Link>
          // <JoinLeague
          //   userId={user?.id}
          //   leagueId={params.leagueId}
          //   leagueName={leagueInfo.name}
          //   joinLeague={joinLeague}
          // />
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
          <div>
            <Link href={`/edit-score/${leagueInfo._id}`}>Edit Score</Link>
            <DeleteLeague
              leagueId={params.leagueId}
              deleteLeague={deleteLeague}
            />
          </div>
        )}
      </div>
    </>
  );
}
