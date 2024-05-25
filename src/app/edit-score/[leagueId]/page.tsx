import { getLeagueInfo } from "@/app/api/leagues/actions";
import { ObjectId } from "mongoose";
import Link from "next/link";
import React from "react";

export default async function EditScore({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  const leagueInfo = await getLeagueInfo(params.leagueId);

  return (
    <>
      <Link
        href={`/league-info/${params.leagueId}`}
        className="text-blue-500 hover:text-yellow-400 text-4xl"
      >
        {leagueInfo.name}
      </Link>
    </>
  );
}
