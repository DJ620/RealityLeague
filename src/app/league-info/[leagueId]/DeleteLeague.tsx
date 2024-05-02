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
    <div>
      <button onClick={handleDeleteLeague}>Delete League</button>
    </div>
  );
}
