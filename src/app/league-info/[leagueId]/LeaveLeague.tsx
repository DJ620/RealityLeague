"use client";
import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  userId: string | undefined;
  leagueId: ObjectId;
  leagueName: string;
  leaveLeague: (
    userId: string | undefined,
    leagueId: ObjectId
  ) => Promise<ILeague>;
};

export default function LeaveLeague({
  userId,
  leagueId,
  leagueName,
  leaveLeague,
}: props) {
  const router = useRouter();

  const handleLeaveLeague = async () => {
    await leaveLeague(userId, leagueId);
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <button
      onClick={handleLeaveLeague}
      className="w-40 p-2 text-red-200 bg-red-700 border border-red-500 rounded-md hover:bg-red-800 hover:border-red-600"
    >
      Leave {leagueName}
    </button>
  );
}
