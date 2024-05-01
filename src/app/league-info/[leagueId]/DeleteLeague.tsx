"use client";

import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  leagueId: ObjectId;
  deleteLeague: (leagueId: ObjectId) => void;
};

export default function DeleteLeague({ leagueId, deleteLeague }: props) {
  const router = useRouter();

  const handleDeleteLeague = async () => {
    deleteLeague(leagueId);
    router.push("/dashboard");
  };

  return (
    <div>
      <button onClick={handleDeleteLeague}>Delete League</button>
    </div>
  );
}
