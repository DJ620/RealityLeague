"use client";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import DeletePlayer from "./DeletePlayer";
import { IPlayer } from "@/app/models/Player";

export default function PlayerInfo({
  playerName,
  playerId,
  isActive,
  changePlayerStatus,
  deletePlayer,
}: {
  playerName: string;
  playerId: ObjectId;
  isActive: boolean;
  changePlayerStatus: (
    playerId: ObjectId,
    isActive: boolean
  ) => Promise<string>;
  deletePlayer: (playerId: ObjectId) => Promise<any>;
}) {
  const router = useRouter();

  const handleChangePlayerStatus = async () => {
    await changePlayerStatus(playerId, !isActive);
    router.refresh();
  };

  return (
    <div className="border-blue-400 border p-2 flex-col justify-center flex bg-slate-900">
      <p
        className={`font-extrabold text-center ${
          isActive ? "text-yellow-400" : "text-red-500"
        }`}
      >
        {playerName}
      </p>
      <div className="pl-3">
        <label className="relative flex justify-center items-center group">
          Active
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleChangePlayerStatus}
            className=" w-full h-full peer appearance-none rounded-md"
          />
          <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-red-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-600 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1 scale-[.55] hover:cursor-pointer"></span>
        </label>
      </div>
      <DeletePlayer playerId={playerId} deletePlayer={deletePlayer} />
    </div>
  );
}
