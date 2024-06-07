"use client";

import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  playerId: ObjectId;
  deletePlayer: (playerId: ObjectId) => any;
};

export default function DeletePlayer({ playerId, deletePlayer }: props) {
  const router = useRouter();

  const handleDeletePlayer = async () => {
    await deletePlayer(playerId);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={handleDeletePlayer}
        className="p-1 mt-4 text-sm bg-red-500 rounded hover:bg-red-600 active:bg-red-700"
      >
        Delete Player
      </button>
    </>
  );
}
