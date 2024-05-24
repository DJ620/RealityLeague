"use client";
import { IRule } from "@/app/models/Rule";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

type props = {
  ruleId: ObjectId;
  deleteRule: (ruleId: ObjectId) => any;
};

export default function DeleteRule({ ruleId, deleteRule }: props) {
  const router = useRouter();

  const handleDeleteRule = async () => {
    await deleteRule(ruleId);
    router.refresh();
  };
  return (
    <>
      <button onClick={handleDeleteRule} className="text-sm p-1 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded">Delete Rule</button>
    </>
  );
}
