import dbConnect from "@/app/lib/dbConnect";
import League from "@/app/models/League";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const leagues = await League.find({});
    return NextResponse.json(leagues);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
