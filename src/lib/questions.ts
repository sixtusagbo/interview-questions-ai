import { zodTextFormat } from "openai/helpers/zod";
import { openai } from "@/lib/openai";
import { QuestionsResponseSchema, type QuestionsResponse } from "@/lib/schema";

export const MODEL = "gpt-5-nano";

export const SYSTEM_INSTRUCTIONS = `You design interview questions for hiring teams.

Given a job title, generate exactly three questions that reveal whether the candidate is qualified for that specific role. Cover three angles:
1. Behavioral — past experience, "tell me about a time..."
2. Technical or role-specific competency — what they actually need to do well
3. Situational — a realistic decision they would face in the role

Rules:
- Specific to the role. Never generic. Skip "tell me about yourself."
- Hard to fake. Reveals real signal. Strong answers come from real experience.
- Answerable in 3 to 5 minutes. Not a take-home in disguise.

For each question, include 'intent': one sentence describing what signal a strong answer reveals to the interviewer.

Do not include personal information, candidate names, or company-specific details in the output.`;

export async function generateQuestions(
  jobTitle: string,
): Promise<QuestionsResponse> {
  const response = await openai.responses.parse({
    model: MODEL,
    instructions: SYSTEM_INSTRUCTIONS,
    input: `Job title: ${jobTitle}`,
    text: {
      format: zodTextFormat(QuestionsResponseSchema, "questions"),
    },
  });

  if (!response.output_parsed) {
    throw new Error("Model returned no parsed output");
  }

  return response.output_parsed;
}
