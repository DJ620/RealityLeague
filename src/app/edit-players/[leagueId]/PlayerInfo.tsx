import { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import React from "react";
import DeletePlayer from "./DeletePlayer";

export default function PlayerInfo({
  player,
  deletePlayer,
}: {
  player: IPlayer;
  deletePlayer: (playerId: ObjectId) => Promise<any>;
}) {
  return (
    <div>
      <p>{player.name}</p>
      <DeletePlayer
        playerId={player._id.toString()}
        deletePlayer={deletePlayer}
      />
    </div>
  );
}
