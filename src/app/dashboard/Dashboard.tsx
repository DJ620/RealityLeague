"use client";
import { IUser } from "../models/User";
import { ILeague } from "../models/League";
import Loader from "@/components/Loader";
import Link from "next/link";
import Moderated from "./Moderated";
import { useEffect, useState } from "react";

type props = {
  checkUser: () => Promise<IUser>;
};

export default function Dashboard({ checkUser }: props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<IUser>();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const info = await checkUser();
    setUserInfo(info);
    setLoading(false);
  };

  return (
    <>
      <Loader loading={loading} />
      {userInfo && (
        <div>
          <div className="text-center">
            <p className="text-4xl mb-5">Dashboard</p>
            <p>Welcome, {userInfo.username}</p>
            <Link href={`/add-league/${userInfo._id}`}>Create New League</Link>
          </div>
          <Moderated leaguesModerating={userInfo.leaguesModerating} />
          <div>
            <p>Participating in:</p>
            {userInfo.leagues.map((league: ILeague) => {
              return (
                <div key={league._id}>
                  <p>{league.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
