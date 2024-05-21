"use client";
import { ILeague } from "@/app/models/League";
import { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import { useState } from "react";
import Player from "./Player";
import { useRouter } from "next/navigation";

export default function PlayerSelection({
  players,
  numberOfSelections,
  joinLeague,
}: {
  players: IPlayer[];
  numberOfSelections: number;
  joinLeague: (players: ObjectId[]) => Promise<ILeague>;
}) {
  const router = useRouter();
  const [selectedPlayers, setSelectedPlayers] = useState<ObjectId[]>([]);

  const handleJoinLeague = () => {
    joinLeague(selectedPlayers);
  };

  return (
    <>
      {players.map((player: IPlayer) => {
        return (
          <Player
            key={player._id}
            player={player}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            numberOfSelections={numberOfSelections}
          />
        );
      })}
      <button
        onClick={handleJoinLeague}
        className={`font-extrabold p-3 rounded mt-2 ${
          selectedPlayers.length < numberOfSelections
            ? "bg-slate-700 text-slate-400 pointer-events-none"
            : "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-yellow-400"
        }`}
      >
        Join league
      </button>
    </>
  );
}
