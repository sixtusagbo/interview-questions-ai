# Interview AI

Type in a job title and get three interview questions for that role: one behavioral, one technical, one situational. Each question comes with the signal a strong answer should reveal.

Built as a 30-minute technical screen exercise.

**Live:** https://interview-questions-ai.vercel.app

## Stack

- **Next.js 16** (App Router, Route Handlers). One deployable for both the UI and the API.
- **TypeScript** and **Tailwind CSS v4**.
- **OpenAI Node SDK** with the Responses API.
- **Zod** for typed structured outputs. It validates the request and enforces the shape of the model response.
- **Vercel** for hosting.

## Model

`gpt-5-nano`. Three reasons.

1. **Cost.** It is the smallest model in the gpt-5 family. If this tool served thousands of recruiters a day, every cent per call adds up, and nano keeps that low.
2. **Structured outputs.** The Responses API with `zodTextFormat` returns a typed object that OpenAI enforces server side. No JSON parsing to babysit, no retry loops for malformed output.
3. **Latency.** For a small interactive tool, how fast it feels matters more than squeezing out the last bit of answer quality.

A bigger model writes slightly sharper questions. That is worth paying for once the tool moves from drafting questions to shipping questions a human uses unedited. For this scope, nano is the right call.

## Architecture

```
src/
├─ app/
│  ├─ api/questions/route.ts   POST handler. Validates input, calls the service, returns JSON.
│  ├─ page.tsx                 Server component. Shells the client UI.
│  └─ layout.tsx
├─ components/
│  └─ QuestionGenerator.tsx    Client component. Form, state, fetch.
└─ lib/
   ├─ openai.ts                Lazy OpenAI client singleton.
   ├─ schema.ts                Zod schemas. Input, output, inferred types.
   └─ questions.ts             The prompt and the generateQuestions() service.
```

The route handler is kept thin on purpose. All the AI logic (model choice, prompt, schema enforcement) lives in `src/lib/questions.ts`. Swapping providers later, say to Anthropic or a self-hosted model, means touching that one file.

## Prompt

The full system prompt is in `src/lib/questions.ts`. The rules that matter:

- **Coverage.** One behavioral, one technical or role-specific, one situational. This forces breadth.
- **Specificity.** Generic openers like "tell me about yourself" are banned.
- **Signal.** Every question ships with an `intent`, one sentence on what a strong answer reveals. That makes the output useful to the interviewer, not just the candidate.
- **Privacy.** The prompt forbids personal information, names, and company-specific details in the output.

## Run locally

```bash
git clone https://github.com/sixtusagbo/interview-questions-ai.git
cd interview-questions-ai
npm install
cp .env.example .env.local
# Add your OpenAI API key to .env.local
npm run dev
```

Then open http://localhost:3000.

## How AI was used in this build

The brief asked for transparency, so here it is.

- Stack decisions (Responses API over Chat Completions, the lazy client singleton, the file layout) were talked through with Claude. The final calls were mine.
- First-pass code for the component, the route handler, and the prompt was AI-assisted, then reviewed and trimmed by hand.
- The prompt was hand-drafted, then run past Claude to check whether each rule was unambiguous.
- The commit history is the real order of work. Nothing was squashed.

## License

MIT.
