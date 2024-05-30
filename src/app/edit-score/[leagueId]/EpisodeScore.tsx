"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import NewScore from "./NewScore";
import { ObjectId } from "mongoose";
import { IEpisode } from "@/app/models/Episode";
import { SerialEpisode, SerialScore } from "./page";

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
  episode
}: {
  rules: rule[];
  players: player[];
  addScore: (
    ruleId: string,
    playerId: string,
    episodeId: string
  ) => Promise<IEpisode>;
  episode: SerialEpisode;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

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
      <h2 className="text-2xl">Episode {episode.number}</h2>
      <div>
        {episode.score.map((score: SerialScore) => {
          return (
            <div key={score._id}>
              <p>{score.rule.rule}</p>
              <p>{score.rule.value}</p>
              <p>{score.player.name}</p>
            </div>
          )
        })}
      </div>
      <button onClick={() => setShowModal(true)}>Add Score</button>
    </>
  );
}
