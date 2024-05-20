import { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import React, { Dispatch, SetStateAction, useState } from "react";

export default function Player({
  player,
  selectedPlayers,
  setSelectedPlayers,
  numberOfSelections,
}: {
  player: IPlayer;
  selectedPlayers: ObjectId[];
  setSelectedPlayers: Dispatch<SetStateAction<ObjectId[]>>;
  numberOfSelections: number;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheck = () => {
    if (isChecked) {
      setIsChecked(false);
      let playerRemoved = selectedPlayers.filter(
        (playerId: ObjectId) => playerId != player._id
      );
      setSelectedPlayers(playerRemoved);
    }
    if (!isChecked && selectedPlayers.length < numberOfSelections) {
      setIsChecked(true);
      setSelectedPlayers([...selectedPlayers, player._id]);
    }
  };

  return (
    <div className="mb-3 flex items-center">
      <input
        type="checkbox"
        name={player.name}
        value={player._id}
        checked={isChecked}
        onChange={handleCheck}
        className="mr-5 size-5"
      />
      <label>{player.name}</label>
    </div>
  );
}
