import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import { IUser } from "@/app/models/User";
import Loader from "@/components/Loader";
import { ObjectId } from "mongoose";
import Link from "next/link";

async function getLeagueInfo(leagueId: any) {
  await dbConnect();
  const leagueInfo = await League.findOne({ _id: leagueId }).populate({
    path: "moderators",
  });
  console.log({ leagueInfo });
  console.log(leagueInfo.moderators);
  return leagueInfo;
}

export default async function LeagueInfo({
  params,
}: {
  params: { leagueId: ObjectId };
}) {
  let loading = true;
  const leagueInfo = await getLeagueInfo(params.leagueId);
  loading = false;
  return (
    <>
      <Loader loading={loading} />
      <div>
        <p className="text-center text-4xl mb-5">{leagueInfo.name}</p>
        <p>Moderator(s):</p>
        {leagueInfo.moderators.map((moderator: IUser) => {
          return <p key={moderator._id}>{moderator.username}</p>;
        })}
        <Link href={`/add-rule/${params.leagueId}`}>Add Rules</Link>
      </div>
    </>
  );
}
