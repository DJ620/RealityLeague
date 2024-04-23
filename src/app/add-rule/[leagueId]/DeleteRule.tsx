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
      <button onClick={handleDeleteRule}>Remove Rule</button>
    </>
  );
}
