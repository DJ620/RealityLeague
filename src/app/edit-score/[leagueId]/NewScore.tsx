"use client";

import { useState } from "react";
import { player, rule } from "./EpisodeScore";
import { ObjectId } from "mongoose";
import { IEpisode } from "@/app/models/Episode";
import { useRouter } from "next/navigation";

export default function NewScore({
  number,
  rules,
  players,
  episodeId,
  addScore,
}: {
  number: number;
  rules: rule[];
  players: player[];
  episodeId: string;
  addScore: (
    ruleId: string,
    playerId: string,
    episodeId: string
  ) => Promise<IEpisode>;
}) {
  const router = useRouter();
  const [ruleId, setRuleId] = useState<string>(rules[0]._id);
  const [playerId, setPlayerId] = useState<string>(players[0]._id);

  const handleAddNewScore = async () => {
    await addScore(ruleId, playerId, episodeId);
    router.refresh();
  };

  return (
    <>
      <h2 className="text-2xl text-center">Add score for Episode {number}</h2>
      <form onSubmit={handleAddNewScore} className="mt-8">
        <div className="flex justify-center gap-10 text-black">
          <div className="flex flex-col">
            <label className="pb-1 text-white">Rule:</label>
            <select
              className="p-1"
              value={ruleId}
              onChange={(e) => setRuleId(e.target.value)}
            >
              {rules.map((rule: rule) => {
                return (
                  <option key={rule._id} value={rule._id}>
                    <p>{rule.rule}</p>
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="pb-1 text-white">Player:</label>
            <select
              className="p-1"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
            >
              {players.map((player: player) => {
                return (
                  <option key={player._id} value={player._id}>
                    <p>{player.name}</p>
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="p-3 mt-5 font-extrabold text-yellow-400 bg-blue-700 rounded hover:bg-blue-800 active:bg-blue-900"
          >
            Add Score
          </button>
        </div>
      </form>
    </>
  );
}
