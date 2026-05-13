# Interview Question Generator

Give it a job title. It returns three role-specific interview questions — one behavioral, one technical, one situational — each with the signal a strong answer reveals.

Built as a 30-minute technical screen exercise.

**Live:** https://interview-questions-ai.vercel.app

## Stack

- **Next.js 16** (App Router, Route Handlers) — single deployable for UI and API
- **TypeScript** + **Tailwind CSS v4**
- **OpenAI Node SDK** with the Responses API
- **Zod** for typed structured outputs (request validation and LLM response schema)
- **Vercel** for hosting

## Model

`gpt-5-nano`. Three reasons:

1. **Cost.** Smallest model in the gpt-5 family. If this tool served thousands of recruiters a day, every cent per call compounds — nano keeps that ceiling low.
2. **Structured outputs.** The Responses API plus `zodTextFormat` returns a typed object enforced server-side by OpenAI — no JSON-parsing brittleness, no retry loops.
3. **Latency.** For an interactive single-screen tool, perceived speed matters more than marginal answer quality.

Tradeoff: a larger model writes slightly sharper questions. That polish is worth paying for when the tool moves from "drafts" to "questions a human ships unedited." For this scope, nano clears the bar.

## Architecture

```
src/
├─ app/
│  ├─ api/questions/route.ts   POST handler — validates input, calls service, returns JSON
│  ├─ page.tsx                  Server component — shells the client UI
│  └─ layout.tsx
├─ components/
│  └─ QuestionGenerator.tsx     Client component — form, state, fetch
└─ lib/
   ├─ openai.ts                 Lazy OpenAI client singleton
   ├─ schema.ts                 Zod schemas — input, output, inferred types
   └─ questions.ts              Prompt + generateQuestions() service
```

The route handler is deliberately thin. All AI logic — model choice, prompt, schema enforcement — lives in `src/lib/questions.ts`. Swapping providers later (Anthropic, Gemini, self-hosted) touches one file.

## Prompt

The full system prompt lives in `src/lib/questions.ts`. The rules that matter:

- **Coverage:** one behavioral, one technical/role-specific, one situational. Forces breadth.
- **Specificity:** explicit ban on generic openers like "tell me about yourself."
- **Signal:** each question includes an `intent` — one sentence on what a strong answer reveals. Makes the output useful to the interviewer, not just the candidate.
- **Privacy:** the prompt forbids personal information, names, or company-specific details in the output.

## Run locally

```bash
git clone https://github.com/sixtusagbo/interview-questions-ai.git
cd interview-questions-ai
npm install
cp .env.example .env.local
# Add your OpenAI API key to .env.local
npm run dev
```

Open http://localhost:3000.

## How AI was used during this build

Per the brief — full transparency.

- **Stack decisions** (Responses API vs Chat Completions, lazy client singleton, file layout) were discussed with Claude as a thinking partner. Final calls were mine.
- **First-pass code** for the component, route handler, and prompt was AI-assisted, then reviewed and trimmed.
- **Prompt design** was hand-drafted, then iterated with Claude as a check on whether each rule was unambiguous.
- **Atomic commit history** reflects the actual order of work; nothing was squashed.

## License

MIT.
