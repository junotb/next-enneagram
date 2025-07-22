import { NextResponse } from "next/server";
import Enneagrams from "@/libs/datas/enneagrams.json";

export async function GET() {
  return NextResponse.json(Enneagrams);
}