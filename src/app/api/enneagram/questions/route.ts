import { NextResponse } from "next/server";
import Questions from "@/libs/datas/questions.json";

export async function GET() {
  return NextResponse.json(Questions);
}