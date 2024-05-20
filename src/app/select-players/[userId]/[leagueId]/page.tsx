import { ObjectId } from "mongoose";
import React from "react";

export default function SelectPlayers({
  params,
}: {
  params: { userId: string; leagueId: ObjectId };
}) {
  return <div>Select Players for {params.userId}</div>;
}
