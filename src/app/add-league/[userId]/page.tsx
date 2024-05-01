"use server";
import LeagueForm from "./LeagueForm";
import { ObjectId } from "mongoose";
import { addLeague } from "@/app/api/leagues/actions";

export default async function AddLeague({
  params,
}: {
  params: {userId: ObjectId};
}) {

  return <LeagueForm userId={params.userId} createLeague={addLeague} />;
}
