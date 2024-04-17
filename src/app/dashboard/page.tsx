import { currentUser } from "@clerk/nextjs";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import Loader from "@/components/Loader";

async function checkUser() {
  const user = await currentUser();
  await dbConnect();
  let registered = await User.findOne({ userId: user?.id });
  if (registered === null) {
    registered = User.create({ userId: user?.id, username: user?.username });
  }
  return registered;
}

export default async function DashboardPage() {
  let loading = true;
  const userInfo = await checkUser();
  loading = false;

  return (
    <div>
      <Loader loading={loading} />
      <p>Dashboard Page</p>
      <p>Welcome, {userInfo.username}</p>
    </div>
  );
}
