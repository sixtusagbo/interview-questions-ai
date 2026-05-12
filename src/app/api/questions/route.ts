import { NextResponse } from "next/server";
import { JobTitleInputSchema } from "@/lib/schema";
import { generateQuestions } from "@/lib/questions";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = JobTitleInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Job title is required and must be 2-100 characters." },
      { status: 400 },
    );
  }

  try {
    const result = await generateQuestions(parsed.data.jobTitle);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Question generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again." },
      { status: 502 },
    );
  }
}
