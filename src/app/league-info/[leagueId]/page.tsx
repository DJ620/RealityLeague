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
import { IEpisode } from "@/app/models/Episode";
import UserPlayers from "./UserPlayers";
import TotalPoints from "./TotalPoints";

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
        <p className="mb-5 text-4xl text-center">{leagueInfo.name}</p>

        <div className="mb-5">
          <p>Moderator(s):</p>
          {leagueInfo.moderators.map((moderator: IUser) => {
            return <p key={moderator._id}>{moderator.username}</p>;
          })}
        </div>

        {leagueInfo.participants.length > 0 && (
          <div className="max-w-full mx-auto mb-5 border border-yellow-400 rounded-sm bg-slate-800 outline-blue-500 outline w-fit">
            <div>
              <div className="flex">
                <div>
                  <p className="flex items-center justify-center px-1 mr-10 text-xl border-r h-9 min-w-36">
                    Participants:
                  </p>
                  {leagueInfo.participants.map((participant: IUser) => {
                    return (
                      <div
                        key={participant._id}
                        className="border-t border-blue-500"
                      >
                        <p className="flex items-center justify-center h-10 px-1 mr-10 font-extrabold text-yellow-400 border-r min-w-36">
                          {participant.username}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <p className="flex items-center justify-center -ml-10 text-xl border-r-2 h-9 border-r-yellow-400 min-w-64">
                    Players:
                  </p>
                  {leagueInfo.participants.map((participant: IUser) => {
                    return (
                      <div
                        key={participant._id}
                        className="border-t border-blue-500"
                      >
                        <div className="flex items-center justify-center h-10 -ml-10 border-r-2 border-r-yellow-400 min-w-64">
                          <UserPlayers
                            leagueInfo={leagueInfo}
                            participant={participant}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="overflow-x-scroll">
                  <div className="flex">
                    {leagueInfo.episodes.map(
                      (episode: IEpisode, index: number) => {
                        return (
                          <p
                            key={episode._id}
                            className={`mr-5 h-9 flex items-center pt-0.5 ${
                              index == 0
                                ? "pl-5 min-w-[4.5rem] border-r"
                                : index == leagueInfo.episodes.length - 1
                                ? "min-w-14"
                                : "min-w-14 border-r"
                            }`}
                          >
                            Ep. {episode.number}
                          </p>
                        );
                      }
                    )}
                  </div>
                  <div>
                    {leagueInfo.participants.map((participant: IUser) => {
                      return (
                        <div key={participant._id}>
                          <UserStats
                            participant={participant}
                            leagueId={leagueInfo._id.toString()}
                            episodes={leagueInfo.episodes}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="flex items-center pl-5 text-xl border-l-2 border-l-yellow-400 h-9 min-w-20">
                    Total:
                  </p>
                  <div>
                    {leagueInfo.participants.map((participant: IUser) => {
                      return (
                        <div key={participant._id}>
                          <TotalPoints
                            participant={participant}
                            leagueId={leagueInfo._id.toString()}
                            episodes={leagueInfo.episodes}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {
                leagueInfo.participants.length > 0 && <></>
                // leagueInfo.participants.map((participant: IUser) => {
                //   return (
                //     <div
                //       key={participant._id}
                //       className="pt-2 border-t border-blue-500"
                //     >
                //       <UserStats
                //         participant={participant}
                //         leagueId={leagueInfo._id.toString()}
                //         episodes={leagueInfo.episodes}
                //       />
                //     </div>
                //   );
                // })
              }
            </div>
          </div>
        )}

        <div className="px-5">
          <div className="flex flex-wrap justify-center mb-5">
          <div className="w-fit">
            {leagueInfo.players.length > 0 && (
              <p className="pb-3 text-xl text-center">Players:</p>
            )}
            <div className="flex flex-wrap justify-center">
              {leagueInfo.players
                .sort((a: IPlayer, b: IPlayer) => a.name.localeCompare(b.name))
                .map((player: IPlayer, index: number) => {
                  return (
                    <div key={player._id} className={`px-5 my-2 ${index < leagueInfo.players.length - 1 && "border-r"}`}>
                      <p
                        className={`font-bold ${
                          player.isActive ? "text-blue-500" : "text-red-500"
                        }`}
                      >
                        {player.name}
                      </p>
                    </div>
                  );
                })}
            </div>
            {isModerator && (
              <div className="self-end pt-4">
                <Link
                  href={`/edit-players/${params.leagueId}`}
                  className="text-red-400"
                >
                  Edit Players
                </Link>
              </div>
            )}
          </div>
          </div>

<div className="flex justify-center">
          <div className="w-fit">
            {leagueInfo.rules.length > 0 && (
              <p className="pb-3 text-xl">Rules:</p>
            )}
            <div className="">
              {leagueInfo.rules.map((rule: IRule) => {
                return (
                  <div key={rule._id} className="flex px-5 py-2 border-t">
                    <p className="font-extrabold text-blue-500 w-60">
                      {rule.rule}
                    </p>
                    <p className="text-yellow-400">Point value: {rule.value}</p>
                  </div>
                );
              })}
            </div>
            {isModerator && (
              <div className="pt-4">
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
