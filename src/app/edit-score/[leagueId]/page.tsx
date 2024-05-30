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
import { ILeague } from "@/app/models/League";
import { IScore } from "@/app/models/Score";

export type SerialEpisode = {
  _id: string;
  number: number;
  score: {
    _id: string;
    rule: {
      _id: string;
      rule: string;
      value: number;
    };
    player: {
      _id: string;
      name: string;
      isActive: boolean;
    };
  };
};

export default async function EditScore({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  const leagueInfo = await getLeagueInfo(params.leagueId);
  const episodes = leagueInfo.episodes.map((episode: IEpisode) => {
    return {
      _id: episode._id.toString(),
      number: episode.number,
      score: episode.score.map((score: IScore) => {
        return {
          _id: score._id.toString(),
          rule: {
            _id: score.rule._id.toString(),
            rule: score.rule.rule,
            value: score.rule.value,
          },
          player: {
            _id: score.player._id.toString(),
            name: score.player.name,
            isActive: score.player.isActive,
          },
        };
      }),
    };
  });
  console.log(episodes);
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
        {episodes.map((episode: SerialEpisode) => {
          return (
            <div key={episode._id}>
              <EpisodeScore
                rules={rules}
                players={players}
                addScore={addScore}
                episode={episode}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}