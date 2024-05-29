import { getLeagueInfo } from "@/app/api/leagues/actions";
import { ObjectId } from "mongoose";
import Link from "next/link";
import React from "react";
import NewEpisode from "./NewEpisode";
import { addEpisode } from "@/app/api/episodes/actions";
import { IEpisode } from "@/app/models/Episode";

export default async function EditScore({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  const leagueInfo = await getLeagueInfo(params.leagueId);
  const numOfEpisodes = leagueInfo.episodes.length + 1;

  return (
    <>
      <Link
        href={`/league-info/${params.leagueId}`}
        className="text-blue-500 hover:text-yellow-400 text-4xl"
      >
        {leagueInfo.name}
      </Link>

      <NewEpisode
        leagueId={params.leagueId}
        addEpisode={addEpisode}
        number={numOfEpisodes}
      />

      <div>
        {leagueInfo.episodes.map((episode: IEpisode) => {
          return (
            <div key={episode._id}>
              <p>Episode number {episode.number}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
