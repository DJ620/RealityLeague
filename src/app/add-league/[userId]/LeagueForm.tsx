"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LeagueForm({ createLeague }: any) {
  const router = useRouter();
  const [leagueName, setLeagueName] = useState<string>("");

  const handleAddLeague = (e: FormEvent) => {
    e.preventDefault();
    createLeague(leagueName);
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
