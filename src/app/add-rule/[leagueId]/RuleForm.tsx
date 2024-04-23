"use client";
import { ILeague } from "@/app/models/League";
import { IRule } from "@/app/models/Rule";
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

  const handleAddRule = () => {
    const ruleToAdd = { rule, value };
    addRuleToDB(ruleToAdd, leagueId).then((res: ILeague) => router.refresh());
  };

  return (
    <form onSubmit={handleAddRule}>
      <div className="mb-3 flex justify-between w-[610px] items-center">
        <label>Rule:</label>
        <input
          type="text"
          name="rule"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          className="text-black p-1 w-[500px]"
        />
      </div>
      <div className="flex justify-between w-[610px] items-center">
        <label>Point Value:</label>
        <input
          type="number"
          min={1}
          name="value"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          className="text-black p-1"
        />
      </div>
      <button type="submit">Add Rule</button>
    </form>
  );
}
