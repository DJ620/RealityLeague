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
  };

  return (
    <button onClick={handleLeaveLeague} className="text-red-500">
      Leave {leagueName}
    </button>
  );
}
