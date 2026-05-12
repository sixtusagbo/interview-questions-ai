"use client";

import { useState, type FormEvent } from "react";
import type { QuestionsResponse } from "@/lib/schema";

export function QuestionGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuestionsResponse | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!jobTitle.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setResult(data as QuestionsResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g. Customer Success Manager"
          disabled={loading}
          maxLength={100}
          aria-label="Job title"
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-900 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
        />
        <button
          type="submit"
          disabled={loading || !jobTitle.trim()}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {loading ? "Generating…" : "Generate questions"}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200"
        >
          {error}
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-4">
          {result.questions.map((q, i) => (
            <article
              key={i}
              className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Question {i + 1}
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {q.type}
                </span>
              </div>
              <p className="text-base text-zinc-900 dark:text-zinc-100">
                {q.question}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Intent:{" "}
                </span>
                {q.intent}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
