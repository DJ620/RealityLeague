import { ILeague } from "../models/League";
import Link from "next/link";

type props = {
  leaguesModerating: ILeague[];
};

export default function Moderated({ leaguesModerating }: props) {
  return (
    <>
      <p>Leagues You Are Moderating</p>
      {leaguesModerating.map((league) => {
        return (
          <div key={league._id}>
            <Link href={`/league-info/${league._id}`}>{league.name}</Link>
          </div>
        );
      })}
    </>
  );
}
