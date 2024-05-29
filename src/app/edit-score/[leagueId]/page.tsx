import { getLeagueInfo } from "@/app/api/leagues/actions";
import { ObjectId } from "mongoose";
import Link from "next/link";
import React from "react";
import NewEpisode from "./NewEpisode";
import { addEpisode } from "@/app/api/episodes/actions";
import { IEpisode } from "@/app/models/Episode";
import Modal from "@/components/Modal";
import EpisodeScore from "./EpisodeScore";
import { IRule } from "@/app/models/Rule";
import { IPlayer } from "@/app/models/Player";
import { addScore } from "@/app/api/scores/actions";

export default async function EditScore({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  const leagueInfo = await getLeagueInfo(params.leagueId);
  console.log(leagueInfo.episodes[0].score)
  const numOfEpisodes = leagueInfo.episodes.length + 1;
  const rules = leagueInfo.rules.map((rule: IRule) => {
    return { _id: rule._id.toString(), rule: rule.rule, value: rule.value };
  });
  const players = leagueInfo.players.map((player: IPlayer) => {
    return {
      _id: player._id.toString(),
      name: player.name,
      isActive: player.isActive,
    };
  });

  return (
    <>
      <Link
        href={`/league-info/${params.leagueId}`}
        className="text-4xl text-blue-500 hover:text-yellow-400"
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
              <EpisodeScore number={episode.number} rules={rules} players={players} episodeId={episode._id.toString()} addScore={addScore}/>
            </div>
          );
        })}
      </div>
    </>
  );
}
