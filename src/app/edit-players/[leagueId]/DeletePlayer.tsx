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
      <button onClick={handleDeletePlayer} className="text-sm p-1 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded mt-2">Delete Player</button>
    </>
  );
}
