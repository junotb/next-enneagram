import WingAnalysis from "@/data/wing-analysis.json";

export async function GET() {
  return Response.json(WingAnalysis);
}
