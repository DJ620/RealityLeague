import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { User as UserType } from "@clerk/nextjs/server";

export default {
  checkUser: async (user: any) => {
    await dbConnect();
    let registered = await User.findOne({ userId: user?.id });
    if (registered === null) {
      registered = User.create({ userId: user?.id, username: user?.username });
    }
    return registered;
  },
};
