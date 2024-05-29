"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import NewScore from "./NewScore";
import { ObjectId } from "mongoose";
import { IEpisode } from "@/app/models/Episode";

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
  number,
  rules,
  players,
  episodeId,
  addScore,
}: {
  number: number;
  rules: rule[];
  players: player[];
  episodeId: string,
  addScore: (
    ruleId: string,
    playerId: string,
    episodeId: string
  ) => Promise<IEpisode>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <NewScore
          number={number}
          rules={rules}
          players={players}
          episodeId={episodeId}
          addScore={addScore}
        />
      </Modal>
      <h2 className="text-2xl">Episode {number}</h2>
      <button onClick={() => setShowModal(true)}>Add Score</button>
    </>
  );
}
