import { currentUser } from "@clerk/nextjs";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";

async function checkUser() {
  const user = await currentUser();
  await dbConnect();
  let registered = await User.findOne({userId: user?.id});
  if (registered === null) {
    registered = User.create({userId: user?.id, username: user?.username});
  };
  return registered;
}

export default async function DashboardPage() {
  const userInfo = await checkUser();
  console.log(userInfo._id);

  return (
    <div>
      <p>Dashboard Page</p>
    </div>
  );
}
