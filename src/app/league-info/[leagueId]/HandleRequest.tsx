"use client";

import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  userId: ObjectId;
  leagueId: ObjectId;
  acceptUserToLeague: (
    userId: ObjectId,
    leagueId: ObjectId
  ) => Promise<ILeague>;
};

export default function HandleRequest({
  userId,
  leagueId,
  acceptUserToLeague,
}: props) {
  const router = useRouter();

  const handleAccept = async () => {
    await acceptUserToLeague(userId, leagueId);
    router.refresh();
  };

  return (
    <div className="flex gap-5">
      <button onClick={handleAccept}>Accept</button>
      {/* <button>Deny</button> */}
    </div>
  );
}
