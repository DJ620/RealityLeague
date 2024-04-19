"use client"
import { useState } from "react";

export default function LeagueForm({createLeague}: any) {
    const [leagueName, setLeagueName] = useState<string>("");
  
    return (
      <div>
        <p className="text-4xl mb-5">Add League</p>
        <form onSubmit={() => createLeague(leagueName)}>
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