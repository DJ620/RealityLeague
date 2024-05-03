"use client";
import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  userId: string | undefined;
  leagueId: ObjectId;
  leagueName: string;
  requestToJoinLeague: (
    userId: string | undefined,
    leagueId: ObjectId
  ) => Promise<ILeague>;
};

export default function RequestToJoin({
  userId,
  leagueId,
  leagueName,
  requestToJoinLeague,
}: props) {
  const router = useRouter();

  const handleRequestToJoin = async () => {
    await requestToJoinLeague(userId, leagueId);
    router.refresh();
  };

  return (
    <button onClick={handleRequestToJoin}>
      Request to join {leagueName}
    </button>
  );
}
