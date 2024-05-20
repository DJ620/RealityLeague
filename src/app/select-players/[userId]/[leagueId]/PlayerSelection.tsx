"use client";
import { ILeague } from "@/app/models/League";
import { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import { useState } from "react";
import Player from "./Player";

export default function PlayerSelection({
  players,
  numberOfSelections,
}: {
  players: IPlayer[];
  numberOfSelections: number;
}) {
  const [selectedPlayers, setSelectedPlayers] = useState<ObjectId[]>([]);
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
    </>
  );
}
