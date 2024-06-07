"use client";
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
      <button
        onClick={handleDeleteRule}
        className="p-1 text-sm bg-red-500 rounded hover:bg-red-600 active:bg-red-700"
      >
        Delete Rule
      </button>
    </>
  );
}
