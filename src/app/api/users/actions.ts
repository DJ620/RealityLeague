import { currentUser } from "@clerk/nextjs";
import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import User from "@/app/models/User";

export async function checkUser() {
  "use server";
  const user = await currentUser();
  await dbConnect();
  await League.find({});
  let registered = await User.findOne({ userId: user?.id })
    .populate("leaguesModerating")
    .populate("leagues");
  if (registered === null) {
    registered = await User.create({
      userId: user?.id,
      username: user?.username,
    });
  }
  return registered;
}
