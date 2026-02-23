import { NextRequest, NextResponse } from "next/server";
import AssessmentQuestions from "@/data/assessment-144q.json";
import { findEnneagramType } from "@/lib/enneagram";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { answers } = data;

    const { type, wing, scores } = findEnneagramType(
      answers,
      AssessmentQuestions as AssessmentQuestion[]
    );

    return NextResponse.json({ type, wing, scores }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}