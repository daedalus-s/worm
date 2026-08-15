"use client";

import { useMemo, useState } from "react";
import { Nav } from "./components/Nav";
import { playCompletionSound, unlockCompletionSound } from "./lib/completion-sound";

type ProgressEvent =
  | { type: "log"; message: string }
  | { type: "agent"; agentId: string; runId?: string }
  | { type: "status"; status: string }
  | { type: "tool"; name: string; status: string }
  | { type: "done"; output: TailoredOutput; agentId: string; runId: string }
  | { type: "error"; message: string };

type TailoredOutput = {
  keywords: string[];
  resumeTex: string;
  coverLetterTex: string;
};

type Tab = "resume" | "cover";

function downloadTex(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function HomePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<TailoredOutput | null>(null);
  const [tab, setTab] = useState<Tab>("resume");
  const [copied, setCopied] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [highPriority, setHighPriority] = useState(false);
  const [skipCoverLetter, setSkipCoverLetter] = useState(false);

  const activeTex = tab === "resume" ? output?.resumeTex : output?.coverLetterTex;
  const canSubmit = jobDescription.trim().length >= 40 && !running;

  const keywordChips = useMemo(() => output?.keywords.slice(0, 24) ?? [], [output]);

  function pushLog(message: string) {
    setLog((current) => {
      if (current[current.length - 1] === message) return current;
      return [...current.slice(-40), message];
    });
  }

  async function onGenerate(event: React.FormEvent) {
    event.preventDefault();
    setRunning(true);
    setError(null);
    setOutput(null);
    setCopied(null);
    setAgentId(null);
    setLog(["Sending the job description to a Cursor cloud agent…"]);
    void unlockCompletionSound();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          company,
          role,
          highPriority,
          skipCoverLetter,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || `Request failed (${response.status}).`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("The browser could not stream the agent response.");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const line = chunk
            .split("\n")
            .find((entry) => entry.startsWith("data: "));
          if (!line) continue;
          const eventPayload = JSON.parse(line.slice(6)) as ProgressEvent;
          handleEvent(eventPayload);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setRunning(false);
    }
  }

  function handleEvent(event: ProgressEvent) {
    switch (event.type) {
      case "log":
        pushLog(event.message);
        break;
      case "agent":
        setAgentId(event.agentId);
        pushLog(
          event.runId
            ? `Agent ${event.agentId} · run ${event.runId}`
            : `Agent ${event.agentId}`,
        );
        break;
      case "status":
        pushLog(`Status: ${event.status}`);
        break;
      case "tool":
        pushLog(`Tool ${event.name}: ${event.status}`);
        break;
      case "error":
        setError(event.message);
        pushLog(event.message);
        break;
      case "done":
        setOutput(event.output);
        setAgentId(event.agentId);
        setTab("resume");
        pushLog(
          event.output.coverLetterTex
            ? "Overleaf resume and cover letter are ready."
            : "Overleaf resume is ready. Cover letter was skipped.",
        );
        void playCompletionSound();
        break;
    }
  }

  async function onCopy(label: string, text: string) {
    const ok = await copyText(text);
    setCopied(ok ? label : "failed");
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <main className="shell">
      <header className="masthead">
        <p className="kicker">Sreeniketh Aathreya · application atelier</p>
        <h1>Worm</h1>
        <p className="lede">
          Paste a job description. A Cursor cloud agent extracts keywords from the posting,
          maps them onto your real experience, and returns Overleaf LaTeX you can compile as-is.
        </p>
        <Nav />
      </header>

      <form className="composer" onSubmit={onGenerate}>
        <label className="field">
          <span>Job description</span>
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the full job description here."
            rows={14}
            required
          />
        </label>

        <div className="row">
          <label className="field">
            <span>Company</span>
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Acme Health"
            />
          </label>
          <label className="field">
            <span>Role title (optional)</span>
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Staff Solutions Architect"
            />
          </label>
        </div>

        <div className="actions">
          <button type="submit" disabled={!canSubmit}>
            {running
              ? "Cloud agent working…"
              : skipCoverLetter
                ? "Write Overleaf resume"
                : "Write Overleaf resume + cover letter"}
          </button>
          <label className="priority-check">
            <input
              type="checkbox"
              checked={highPriority}
              onChange={(event) => setHighPriority(event.target.checked)}
            />
            <span>High priority</span>
          </label>
          <label className="priority-check">
            <input
              type="checkbox"
              checked={skipCoverLetter}
              onChange={(event) => setSkipCoverLetter(event.target.checked)}
            />
            <span>Skip cover letter</span>
          </label>
          <p className="hint">
            High priority uses Cursor Grok 4.6 High. Skip cover letter if you only need a resume.
          </p>
        </div>
      </form>

      {(running || log.length > 0) && (
        <section className="log-panel" aria-live="polite">
          <div className="log-head">
            <h2>Cloud agent</h2>
            {agentId ? <code>{agentId}</code> : null}
          </div>
          <ol>
            {log.map((line, index) => (
              <li key={`${index}-${line}`}>{line}</li>
            ))}
          </ol>
        </section>
      )}

      {error ? <p className="error">{error}</p> : null}

      {output ? (
        <section className="results">
          {keywordChips.length > 0 ? (
            <div className="keywords">
              <h2>Keywords pulled from the posting</h2>
              <ul>
                {keywordChips.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="tabs">
            <button
              type="button"
              className={tab === "resume" ? "active" : ""}
              onClick={() => setTab("resume")}
            >
              Resume.tex
            </button>
            <button
              type="button"
              className={tab === "cover" ? "active" : ""}
              onClick={() => setTab("cover")}
              disabled={!output.coverLetterTex}
            >
              Cover-letter.tex
            </button>
          </div>

          <div className="toolbar">
            <button
              type="button"
              onClick={() => activeTex && onCopy(tab, activeTex)}
              disabled={!activeTex}
            >
              {copied === tab ? "Copied" : "Copy Overleaf code"}
            </button>
            <button
              type="button"
              onClick={() =>
                activeTex &&
                downloadTex(
                  tab === "resume"
                    ? "SreenikethAathreya_Resume.tex"
                    : "SreenikethAathreya_CoverLetter.tex",
                  activeTex,
                )
              }
              disabled={!activeTex}
            >
              Download .tex
            </button>
            <span className="hint">
              New Overleaf project → paste → compile with pdfLaTeX. Need <code>fontawesome5</code> for the resume.
            </span>
          </div>

          <pre className="tex">{activeTex}</pre>
        </section>
      ) : null}
    </main>
  );
}
