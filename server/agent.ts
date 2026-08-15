import { Agent, CursorAgentError, type ModelSelection, type SDKMessage } from "@cursor/sdk";
import { parseAgentOutput, type TailoredOutput } from "./parse";

export type TailoringResult = TailoredOutput & {
  agentId: string;
  runId: string;
};

export type ProgressEvent =
  | { type: "log"; message: string }
  | { type: "agent"; agentId: string; runId?: string }
  | { type: "status"; status: string }
  | { type: "tool"; name: string; status: string }
  | { type: "done"; output: TailoredOutput; agentId: string; runId: string }
  | { type: "error"; message: string; retryable?: boolean };

const DEFAULT_MODEL = "composer-2.5";
const HIGH_PRIORITY_MODEL = "grok-4.6";

function selectModel(highPriority: boolean): ModelSelection {
  if (highPriority) {
    return {
      id: process.env.CURSOR_HIGH_PRIORITY_MODEL?.trim() || HIGH_PRIORITY_MODEL,
      params: [{ id: "effort", value: "high" }],
    };
  }

  return { id: process.env.CURSOR_MODEL?.trim() || DEFAULT_MODEL };
}

function cloudOptions() {
  const repoUrl = process.env.CURSOR_CLOUD_REPO_URL?.trim();
  const startingRef = process.env.CURSOR_CLOUD_REPO_REF?.trim() || "main";

  return {
    repos: repoUrl ? [{ url: repoUrl, startingRef }] : [],
    autoCreatePR: false,
    skipReviewerRequest: true,
    metadata: {
      app: "worm-resume",
    },
  };
}

function describeEvent(event: SDKMessage): ProgressEvent | null {
  switch (event.type) {
    case "status":
      return { type: "status", status: event.status };
    case "tool_call":
      return { type: "tool", name: event.name, status: event.status };
    case "thinking":
      return { type: "log", message: "Cloud agent is reasoning over the job description…" };
    case "assistant":
      return { type: "log", message: "Cloud agent is writing Overleaf LaTeX…" };
    default:
      return null;
  }
}

export async function runTailoringAgent(
  prompt: string,
  onProgress: (event: ProgressEvent) => void,
  signal?: AbortSignal,
  highPriority = false,
): Promise<TailoringResult> {
  const apiKey = process.env.CURSOR_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "Missing CURSOR_API_KEY. Create a user key at https://cursor.com/dashboard/api and put it in .env.local.",
    );
  }

  const model = selectModel(highPriority);
  onProgress({
    type: "log",
    message: highPriority
      ? "High-priority run: using Cursor Grok 4.6 High…"
      : process.env.CURSOR_CLOUD_REPO_URL
        ? "Launching a Cursor cloud agent against the connected repo…"
        : "Launching a no-repo Cursor cloud agent…",
  });

  try {
    await using agent = await Agent.create({
      apiKey,
      name: highPriority ? "Resume tailor (high priority)" : "Resume tailor",
      model,
      cloud: cloudOptions(),
    });

    onProgress({ type: "agent", agentId: agent.agentId });
    onProgress({ type: "log", message: `Cloud agent ${agent.agentId} is running.` });

    const run = await agent.send(prompt);
    onProgress({ type: "agent", agentId: agent.agentId, runId: run.id });

    const cancel = async () => {
      if (run.supports("cancel")) {
        await run.cancel();
      }
    };
    signal?.addEventListener("abort", () => {
      void cancel();
    });

    if (run.supports("stream")) {
      for await (const event of run.stream()) {
        if (signal?.aborted) break;
        const progress = describeEvent(event);
        if (progress) onProgress(progress);
      }
    }

    const result = await run.wait();
    if (result.status === "error") {
      throw new Error(result.error?.message || `Cloud agent run ${result.id} failed.`);
    }
    if (result.status === "cancelled") {
      throw new Error("The cloud agent run was cancelled.");
    }

    let raw = result.result ?? "";

    try {
      const artifacts = await agent.listArtifacts();
      for (const artifact of artifacts) {
        if (!/\.(tex|txt|md)$/i.test(artifact.path)) continue;
        const buffer = await agent.downloadArtifact(artifact.path);
        raw += `\n\n${buffer.toString("utf8")}`;
      }
    } catch {
      // Artifacts are optional; the final assistant text is the source of truth.
    }

    const output = parseAgentOutput(raw);
    if (!output.resumeTex || !output.coverLetterTex) {
      throw new Error(
        "The cloud agent finished but did not return complete Overleaf documents. Try again with a shorter job description.",
      );
    }

    onProgress({
      type: "done",
      output,
      agentId: agent.agentId,
      runId: result.id,
    });
    return {
      ...output,
      agentId: agent.agentId,
      runId: result.id,
    };
  } catch (error) {
    if (error instanceof CursorAgentError) {
      const retryHint = error.isRetryable ? " This failure looks retryable." : "";
      throw new Error(`Could not start the Cursor cloud agent: ${error.message}.${retryHint}`);
    }
    throw error;
  }
}
