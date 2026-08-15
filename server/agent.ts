import {
  Agent,
  Cursor,
  CursorAgentError,
  type ModelListItem,
  type ModelParameterValue,
  type ModelSelection,
  type SDKMessage,
} from "@cursor/sdk";
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
const CATALOG_TTL_MS = 10 * 60 * 1000;

type ResolvedModel = {
  model: ModelSelection;
  label: string;
};

let catalogCache: { at: number; items: ModelListItem[] } | null = null;

function envId(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

async function loadCatalog(apiKey: string): Promise<ModelListItem[]> {
  if (catalogCache && Date.now() - catalogCache.at < CATALOG_TTL_MS) {
    return catalogCache.items;
  }
  const items = await Cursor.models.list({ apiKey });
  catalogCache = { at: Date.now(), items };
  return items;
}

function findModel(catalog: ModelListItem[], id: string): ModelListItem | undefined {
  const needle = id.toLowerCase();
  return (
    catalog.find((model) => model.id.toLowerCase() === needle) ||
    catalog.find((model) => (model.aliases ?? []).some((alias) => alias.toLowerCase() === needle))
  );
}

function highVariantScore(displayName: string): number {
  const name = displayName.toLowerCase();
  if (/\bxhigh\b/.test(name)) return 50;
  if (!/\bhigh\b/.test(name)) return 0;
  // Prefer "Grok 4.6 High" over "Grok 4.6 High Fast" for high-priority runs.
  return /\bfast\b/.test(name) ? 80 : 90;
}

function pickVariant(
  model: ModelListItem,
  preferHigh: boolean,
): { params?: ModelParameterValue[]; label: string } {
  const variants = model.variants ?? [];
  if (preferHigh && variants.length) {
    let best = variants[0];
    let bestScore = -1;
    for (const variant of variants) {
      const score = highVariantScore(variant.displayName);
      if (score > bestScore) {
        best = variant;
        bestScore = score;
      }
    }
    if (bestScore > 0) {
      return { params: best.params, label: best.displayName };
    }
  }

  const fallback = variants.find((variant) => variant.isDefault) ?? variants[0];
  if (fallback) {
    return { params: fallback.params, label: fallback.displayName };
  }

  if (preferHigh) {
    const effort = model.parameters?.find((parameter) => parameter.id === "effort");
    const high = effort?.values.find((value) => value.value === "high");
    const fast = model.parameters?.find((parameter) => parameter.id === "fast");
    const params: ModelParameterValue[] = [];
    if (high) params.push({ id: "effort", value: high.value });
    const fastTrue = fast?.values.find((value) => value.value === "true");
    if (fastTrue) params.push({ id: "fast", value: fastTrue.value });
    if (params.length) {
      return { params, label: `${model.displayName || model.id} High` };
    }
  }

  return { label: model.displayName || model.id };
}

function selectionFromModel(model: ModelListItem, preferHigh: boolean): ResolvedModel {
  const picked = pickVariant(model, preferHigh);
  return {
    model: {
      id: model.id,
      ...(picked.params !== undefined ? { params: picked.params } : {}),
    },
    label: picked.label,
  };
}

async function resolveModel(apiKey: string, highPriority: boolean): Promise<ResolvedModel> {
  const defaultId = envId("CURSOR_MODEL", DEFAULT_MODEL);
  const highId = envId("CURSOR_HIGH_PRIORITY_MODEL", HIGH_PRIORITY_MODEL);

  let catalog: ModelListItem[] = [];
  try {
    catalog = await loadCatalog(apiKey);
  } catch {
    // Fall through to a conservative hardcoded variant if discovery fails.
  }

  if (!highPriority) {
    const found = findModel(catalog, defaultId);
    if (found) return selectionFromModel(found, false);
    return { model: { id: defaultId }, label: defaultId };
  }

  const grok =
    findModel(catalog, highId) ||
    catalog.find((model) => /^grok-4\.6\b/i.test(model.id)) ||
    catalog.find((model) => /grok\s*4\.6/i.test(model.displayName || ""));
  if (grok) return selectionFromModel(grok, true);

  const grok45 =
    findModel(catalog, "grok-4.5") ||
    catalog.find((model) => /grok\s*4\.5/i.test(model.displayName || ""));
  if (grok45) {
    const resolved = selectionFromModel(grok45, true);
    return { ...resolved, label: `${resolved.label} (Grok 4.6 not in catalog)` };
  }

  const router = findModel(catalog, "auto-smart");
  if (router) {
    const intelligence = router.variants?.find((variant) =>
      /intelligence/i.test(variant.displayName),
    );
    if (intelligence) {
      return {
        model: { id: router.id, params: intelligence.params },
        label: `${intelligence.displayName} (Grok 4.6 not in catalog)`,
      };
    }
  }

  const composer = findModel(catalog, defaultId);
  if (composer) {
    const resolved = selectionFromModel(composer, false);
    return { ...resolved, label: `${resolved.label} (Grok 4.6 not in catalog)` };
  }

  // Last resort: include both effort and fast so the pair can match a Grok variant.
  return {
    model: {
      id: highId,
      params: [
        { id: "effort", value: "high" },
        { id: "fast", value: "true" },
      ],
    },
    label: "Grok 4.6 High",
  };
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
  options: { highPriority?: boolean; skipCoverLetter?: boolean } = {},
): Promise<TailoringResult> {
  const apiKey = process.env.CURSOR_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "Missing CURSOR_API_KEY. Create a user key at https://cursor.com/dashboard/api and put it in .env.local.",
    );
  }

  const resolved = await resolveModel(apiKey, options.highPriority === true);
  const model = resolved.model;
  onProgress({
    type: "log",
    message: options.highPriority
      ? `High-priority run: using ${resolved.label}…`
      : process.env.CURSOR_CLOUD_REPO_URL
        ? "Launching a Cursor cloud agent against the connected repo…"
        : "Launching a no-repo Cursor cloud agent…",
  });
  if (options.skipCoverLetter) {
    onProgress({ type: "log", message: "Cover letter skipped for this application." });
  }

  try {
    await using agent = await Agent.create({
      apiKey,
      name: options.highPriority ? "Resume tailor (high priority)" : "Resume tailor",
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

    const output = parseAgentOutput(raw, { skipCoverLetter: options.skipCoverLetter });
    if (!output.resumeTex) {
      throw new Error(
        "The cloud agent finished but did not return a complete Overleaf resume. Try again with a shorter job description.",
      );
    }
    if (!options.skipCoverLetter && !output.coverLetterTex) {
      throw new Error(
        "The cloud agent finished but did not return a complete Overleaf cover letter. Try again, or skip the cover letter.",
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
