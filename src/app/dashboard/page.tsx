import { currentUser } from "@clerk/nextjs";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import League, { ILeague } from "../models/League";
import Loader from "@/components/Loader";
import Link from "next/link";
import Leagues from "./Leagues";
import LeagueSelections from "../models/LeagueSelections";
import ModeratingLeagues from "./ModeratingLeagues";

async function checkUser() {
  const user = await currentUser();
  await dbConnect();
  await League.find({});
  await LeagueSelections.find({});
  let registered = await User.findOne({ userId: user?.id })
    .populate("leaguesModerating")
    .populate({
      path: "leagues",
      populate: {
        path: "league"
      }
    });
  if (registered === null) {
    registered = await User.create({
      userId: user?.id,
      username: user?.username,
    });
  }
  return registered;
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let loading = true;
  const userInfo = await checkUser();
  loading = false;

  return (
    <>
      <Loader loading={loading} />
      <div className="text-center">
        <p className="text-4xl mb-5">Dashboard</p>
        <p>Welcome, {userInfo.username}</p>
        <Link href={`/add-league/${userInfo._id}`}>Create New League</Link>
      </div>

      {userInfo.leaguesModerating.length > 0 && (
        <div>
          <p>Leagues you are moderating:</p>
          <ModeratingLeagues leagues={userInfo.leaguesModerating} />
        </div>
      )}

      {userInfo.leagues.length > 0 && (
        <div>
          <p>Participating in:</p>
          <Leagues leagues={userInfo.leagues} />
        </div>
      )}
    </>
  );
}
