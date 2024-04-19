import { ILeague } from "../models/League";

type props = {
  leaguesModerating: ILeague[];
};

export default function Moderated({ leaguesModerating }: props) {

  return (
    <>
    <p>Leagues You Are Moderating</p>
      {leaguesModerating.map((league) => {
        return <div key={league._id}>
          <p>{league.name}</p>
        </div>;
      })}
    </>
  );
}
