"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import NewScore from "./NewScore";
import { ObjectId } from "mongoose";
import { IEpisode } from "@/app/models/Episode";
import { SerialEpisode, SerialScore } from "./page";
import { useRouter } from "next/navigation";

export type rule = {
  _id: string;
  rule: string;
  value: number;
};

export type player = {
  _id: string;
  name: string;
  isActive: boolean;
};

export default function EpisodeScore({
  rules,
  players,
  addScore,
  deleteScore,
  episode,
}: {
  rules: rule[];
  players: player[];
  addScore: (
    ruleId: string,
    playerId: string,
    episodeId: string
  ) => Promise<IEpisode>;
  deleteScore: (scoreId: string, episodeId: string) => Promise<string>;
  episode: SerialEpisode;
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDeleteScore = async (scoreId: string) => {
    await deleteScore(scoreId, episode._id);
    router.refresh();
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <NewScore
          number={episode.number}
          rules={rules}
          players={players}
          episodeId={episode._id}
          addScore={addScore}
        />
      </Modal>
      <div className="flex items-center justify-between pb-3 min-w-[595px]">
        <h2 className="text-2xl">Episode {episode.number}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="p-1 mr-5 font-semibold text-yellow-400 bg-blue-700 rounded hover:bg-blue-800 active:bg-blue-900"
        >
          Add Score
        </button>
      </div>
      <div>
        {episode.score.map((score: SerialScore, index: number) => {
          return (
            <div
              key={score._id}
              className={`flex items-center px-5 py-2 border-t`}
            >
              <p className="w-24 font-bold text-blue-500">
                {score.player.name}
              </p>
              <p className="font-bold text-yellow-400 w-60">
                {score.rule.rule}
              </p>
              <p className="w-32">Point value: {score.rule.value}</p>
              <button
                onClick={() => handleDeleteScore(score._id)}
                className="p-1 text-sm bg-red-500 rounded hover:bg-red-600 active:bg-red-700"
              >
                Delete Score
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
