"use client";
import { ILeague } from "@/app/models/League";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";

type props = {
  addRuleToDB: (
    rule: { rule: string; value: number },
    leagueMongoId: ObjectId
  ) => Promise<ILeague>;
  leagueId: ObjectId;
};

export default function RulesForm({ addRuleToDB, leagueId }: props) {
  const router = useRouter();
  const [rule, setRule] = useState<string>("");
  const [value, setValue] = useState<number>(1);

  const handleAddRule = async () => {
    const ruleToAdd = { rule, value };
    await addRuleToDB(ruleToAdd, leagueId);
    router.refresh();
  };

  return (
    <form onSubmit={handleAddRule}>
      <div className="flex items-center mb-3">
        <label className="w-20">Rule:</label>
        <input
          type="text"
          name="rule"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          className="text-black p-1 w-[500px]"
        />
      </div>
      <div className="flex items-center">
        <label className="w-20">Points:</label>
        <input
          type="number"
          min={1}
          name="value"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          className="w-16 p-1 text-black"
        />
      </div>
      <button
        type="submit"
        className={`font-extrabold p-3 rounded mt-5 ${
          rule === "" || value < 1
            ? "bg-slate-700 text-slate-400 pointer-events-none"
            : "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-yellow-400"
        }`}
      >
        Add Rule
      </button>
    </form>
  );
}
