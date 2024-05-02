"use client";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type props = {
  userId: ObjectId;
  createLeague: (league: string, userId: ObjectId) => Promise<ObjectId>;
}

export default function LeagueForm({ userId, createLeague }: props) {
  const router = useRouter();
  const [leagueName, setLeagueName] = useState<string>("");

  const handleAddLeague = async (e: FormEvent) => {
    e.preventDefault();
    const leagueId = await createLeague(leagueName, userId);
    router.push(`/league-info/${leagueId}`);
    router.refresh();
  };

  return (
    <div>
      <p className="text-4xl mb-5">Add League</p>
      <form onSubmit={(e) => handleAddLeague(e)}>
        <div>
          <label className="mr-2">League Name:</label>
          <input
            type="text"
            name="name"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            className="text-black p-1"
          />
        </div>
        <button type="submit" className="outline p-2 mt-5">
          Create League
        </button>
      </form>
    </div>
  );
}
