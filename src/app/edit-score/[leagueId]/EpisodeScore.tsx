"use client";

import Modal from "@/components/Modal";
import { useState } from "react";

type rule = {
  _id: string;
  rule: string;
  value: number;
};

type player = {
  _id: string;
  name: string;
  isActive: boolean;
};

export default function EpisodeScore({
  number,
  rules,
  players,
}: {
  number: number;
  rules: rule[];
  players: player[];
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {showModal && (
        <Modal>
          <button
            onClick={() => setShowModal(false)}
            className="float-right pt-2 pr-4 text-2xl hover:text-red-600"
          >
            X
          </button>
          <h2 className="text-2xl text-center pt-10">
            Add score for Episode {number}
          </h2>
          <div className="flex justify-center mt-20 gap-10 text-black">
            <select className="p-1">
              {rules.map((rule: rule) => {
                return (
                  <option key={rule._id} value={rule._id}>
                    <p>{rule.rule}</p>
                  </option>
                );
              })}
            </select>
            <select className="p-1">
              {players.map((player: player) => {
                return (
                  <option key={player._id} value={player._id}>
                    <p>{player.name}</p>
                  </option>
                );
              })}
            </select>
          </div>
        </Modal>
      )}
      <h2 className="text-2xl">Episode {number}</h2>
      <button onClick={() => setShowModal(true)}>Add Score</button>
    </>
  );
}
