import { NextRequest, NextResponse } from "next/server";
import Questions from "@/libs/datas/questions.json";
import { findEnneagramType } from "@/libs/enneagram";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { answers } = data;

    const type = findEnneagramType(answers, Questions);
    
    // Here you would typically save the data to a database or perform some action
    return NextResponse.json({ type }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}