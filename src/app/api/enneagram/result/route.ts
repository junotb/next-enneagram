import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Process the data as needed
    console.log("Received data:", data);
    
    // Here you would typically save the data to a database or perform some action
    return NextResponse.json({ message: "Data received successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}