"use client";
import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  userId: string | undefined;
  leagueId: ObjectId;
  leagueName: string;
  joinLeague: (
    userId: string | undefined,
    leagueId: ObjectId
  ) => Promise<ILeague>;
};

export default function JoinLeague({
  userId,
  leagueId,
  leagueName,
  joinLeague,
}: props) {
  const router = useRouter();

  const handleJoinLeague = async () => {
    await joinLeague(userId, leagueId);
    router.refresh();
  };

  return <button onClick={handleJoinLeague}>Join {leagueName}</button>;
}
