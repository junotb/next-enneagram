import PrimaryTypes from "@/data/primary-types.json";

export async function GET() {
  return Response.json(PrimaryTypes);
}
