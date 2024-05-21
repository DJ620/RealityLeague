import { ILeague } from "../models/League";
import Link from "next/link";

type props = {
  leagues: ILeague[];
};

export default function ModeratingLeagues({ leagues }: props) {
  return (
    <>
      {leagues.map((league) => {
        return (
          <div key={league._id}>
            <Link href={`/league-info/${league._id}`}>{league.name}</Link>
          </div>
        );
      })}
    </>
  );
}
