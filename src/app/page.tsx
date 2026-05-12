import { QuestionGenerator } from "@/components/QuestionGenerator";
import { MODEL } from "@/lib/questions";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Interview Question Generator
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Enter a job title. Get three thoughtful interview questions tailored
          to the role.
        </p>
      </header>
      <QuestionGenerator />
      <footer className="mt-auto pt-8 text-xs text-zinc-500 dark:text-zinc-500">
        Powered by OpenAI {MODEL}.{" "}
        <a
          href="https://github.com/sixtusagbo/interview-questions-ai"
          className="underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
        .
      </footer>
    </main>
  );
}
