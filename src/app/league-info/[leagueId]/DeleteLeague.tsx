"use client";

import { ObjectId } from "mongoose";

type props = {
  leagueId: ObjectId;
  deleteLeague: (leagueId: ObjectId) => void;
};

export default function DeleteLeague({ leagueId, deleteLeague }: props) {
  return (
    <div>
      <button onClick={() => deleteLeague(leagueId)}>Delete League</button>
    </div>
  );
}
