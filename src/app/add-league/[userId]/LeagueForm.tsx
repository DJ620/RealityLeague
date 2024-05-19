"use client";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type props = {
  userId: ObjectId;
  createLeague: (
    league: string,
    numberOfSelections: number,
    userId: ObjectId
  ) => Promise<ObjectId>;
};

export default function LeagueForm({ userId, createLeague }: props) {
  const router = useRouter();
  const [leagueName, setLeagueName] = useState<string>("");
  const [numberOfSelections, setNumberOfSelections] = useState<number>(1);

  const handleAddLeague = async (e: FormEvent) => {
    e.preventDefault();
    const leagueId = await createLeague(leagueName, numberOfSelections, userId);
    router.push(`/league-info/${leagueId}`);
    router.refresh();
  };

  return (
    <div>
      <p className="text-4xl mb-5">Add League</p>
      <form onSubmit={(e) => handleAddLeague(e)}>
        <div className="mb-5 flex items-center">
          <label className="w-56">League Name:</label>
          <input
            type="text"
            name="name"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            className="text-black p-1"
          />
        </div>
        <div className="flex items-center">
          <label className="w-56">Number of players to select:</label>
          <input
            type="number"
            name="selections"
            value={numberOfSelections}
            onChange={(e) => setNumberOfSelections(+e.target.value)}
            min={1}
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
