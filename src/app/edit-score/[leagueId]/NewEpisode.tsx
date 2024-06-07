"use client";
import { useRouter } from "next/navigation";
import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";

export default function NewEpisode({
  addEpisode,
  leagueId,
  number,
}: {
  addEpisode: (leagueId: ObjectId, number: number) => Promise<ILeague>;
  leagueId: ObjectId;
  number: number;
}) {
  const router = useRouter();

  const handleAddNewEpisode = async () => {
    await addEpisode(leagueId, number);
    router.refresh();
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleAddNewEpisode}
        className="p-3 mt-5 font-extrabold text-yellow-400 bg-blue-700 rounded hover:bg-blue-800 active:bg-blue-900"
      >
        Add New Episode
      </button>
    </div>
  );
}
