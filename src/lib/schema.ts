import { z } from "zod";

export const JobTitleInputSchema = z.object({
  jobTitle: z.string().trim().min(2).max(100),
});

export const QuestionSchema = z.object({
  question: z.string(),
  type: z.enum(["behavioral", "technical", "situational"]),
  intent: z.string(),
});

export const QuestionsResponseSchema = z.object({
  questions: z.array(QuestionSchema).length(3),
});

export type JobTitleInput = z.infer<typeof JobTitleInputSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type QuestionsResponse = z.infer<typeof QuestionsResponseSchema>;
