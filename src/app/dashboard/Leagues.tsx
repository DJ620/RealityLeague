import Link from "next/link";
import { ILeagueSelections } from "../models/LeagueSelections";

type props = {
  leagues: ILeagueSelections[];
};

export default function Leagues({ leagues }: props) {
  return (
    <>
      {leagues.map((league) => {
        return (
          <div key={league._id}>
            <Link href={`/league-info/${league.league._id}`}>
              {league.league.name}
            </Link>
          </div>
        );
      })}
    </>
  );
}
