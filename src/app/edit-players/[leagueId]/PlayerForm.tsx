"use client";
import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";

type props = {
  addPlayer: (player: string, leagueMongoId: ObjectId) => Promise<ILeague>;
  leagueId: ObjectId;
};

export default function PlayerForm({ addPlayer, leagueId }: props) {
  const router = useRouter();
  const [player, setPlayer] = useState<string>("");

  const handleAddPlayer = async () => {
    await addPlayer(player, leagueId);
    router.refresh();
  };

  return (
    <form onSubmit={handleAddPlayer} className="flex items-center gap-10">
      <div className="">
        <label className="mr-4">Player name:</label>
        <input
          type="text"
          name="player"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          className="p-1 text-black"
        />
      </div>
      <button
        type="submit"
        className={`font-extrabold p-3 rounded ${
          player === ""
            ? "bg-slate-700 text-slate-400 pointer-events-none"
            : "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-yellow-400"
        }`}
      >
        Add Player
      </button>
    </form>
  );
}
