import { QuestionGenerator } from "@/components/QuestionGenerator";

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
    </main>
  );
}
