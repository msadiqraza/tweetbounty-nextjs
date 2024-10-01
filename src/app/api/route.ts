// app/api/route.ts
import { NextResponse } from "next/server";

// Handle GET requests to /api/main
export async function GET() {
	return NextResponse.json({ message: "Hello World" });
}
