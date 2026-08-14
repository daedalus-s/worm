import { buildAgentPrompt } from "@/server/prompt";
import { runTailoringAgent, type ProgressEvent } from "@/server/agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 800;

const MAX_JD_CHARS = 40_000;

type GenerateBody = {
  jobDescription?: string;
  company?: string;
  role?: string;
};

function sse(event: ProgressEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(request: Request) {
  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return Response.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const jobDescription = body.jobDescription?.trim() ?? "";
  if (jobDescription.length < 40) {
    return Response.json(
      { error: "Paste a full job description (at least a few sentences)." },
      { status: 400 },
    );
  }
  if (jobDescription.length > MAX_JD_CHARS) {
    return Response.json(
      { error: `Job description is too long (${MAX_JD_CHARS} character max).` },
      { status: 400 },
    );
  }

  const prompt = buildAgentPrompt({
    jobDescription,
    company: body.company?.trim(),
    role: body.role?.trim(),
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: ProgressEvent) => {
        controller.enqueue(encoder.encode(sse(event)));
      };

      try {
        await runTailoringAgent(prompt, send, request.signal);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown agent error.";
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
