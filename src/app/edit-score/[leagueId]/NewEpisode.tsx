"use client";
import { useRouter } from "next/navigation";
import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";

export default function NewEpisode({
  addEpisode,
  leagueId,
  number,
}: {
  addEpisode: (
    leagueId: ObjectId,
    number: number,
  ) => Promise<ILeague>;
  leagueId: ObjectId;
  number: number;
}) {
  const router = useRouter();

  const handleAddNewEpisode = async () => {
    await addEpisode(leagueId, number);
    router.refresh();
  };

  return (
    <div className="mb-5 pb-8 border-b border-yellow-400">
      <button
        onClick={handleAddNewEpisode}
        className="font-extrabold p-3 rounded mt-5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-yellow-400"
      >
        Add New Episode
      </button>
    </div>
  );
}
