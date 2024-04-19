import { currentUser } from "@clerk/nextjs";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import League from "../models/League";
import Loader from "@/components/Loader";
import Link from "next/link";
import Moderated from "./Moderated";

async function checkUser() {
  const user = await currentUser();
  await dbConnect();
  await League.find({});
  let registered = await User.findOne({ userId: user?.id }).populate({
    path: "leaguesModerating",
  });
  if (registered === null) {
    registered = await User.create({
      userId: user?.id,
      username: user?.username,
    });
  }
  console.log({ registered });
  console.log(registered.leaguesModerating);
  return registered;
}

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
        <Link href={"/add-league"}>Add New League</Link>
      </div>
      <Moderated leaguesModerating={userInfo.leaguesModerating} />
    </>
  );
}
