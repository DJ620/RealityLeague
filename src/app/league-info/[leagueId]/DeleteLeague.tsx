"use client";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  leagueId: ObjectId;
  deleteLeague: (leagueId: ObjectId) => any;
};

export default function DeleteLeague({ leagueId, deleteLeague }: props) {
  const router = useRouter();

  const handleDeleteLeague = async () => {
    deleteLeague(leagueId).then(() => {
      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <>
      <button
        onClick={handleDeleteLeague}
        className="p-1.5 text-red-500 border rounded-md border-slate-500 bg-slate-700 hover:bg-slate-800 hover:border-slate-600"
      >
        Delete League
      </button>
    </>
  );
}
