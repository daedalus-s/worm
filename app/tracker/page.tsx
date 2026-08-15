"use client";

import { useEffect, useMemo, useState } from "react";
import { Nav } from "../components/Nav";
import type { ApplicationRecord } from "@/server/application-types";

function formatGeneratedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

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

export default function TrackerPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/applications");
      if (!response.ok) throw new Error("Could not load the tracker.");
      const payload = (await response.json()) as { applications: ApplicationRecord[] };
      setApplications(payload.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the tracker.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return applications;
    return applications.filter((application) => {
      const haystack = [
        application.company,
        application.role,
        application.jobDescription,
        application.generatedAt,
      ]
        .join("\n")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [applications, query]);

  async function patchApplication(id: string, body: Record<string, unknown>) {
    const response = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      setError("Could not update that row.");
      return;
    }
    const payload = (await response.json()) as { application: ApplicationRecord };
    setApplications((current) =>
      current.map((application) => (application.id === id ? payload.application : application)),
    );
  }

  async function onDelete(id: string) {
    const response = await fetch(`/api/applications/${id}`, { method: "DELETE" });
    if (!response.ok && response.status !== 204) {
      setError("Could not delete that row.");
      return;
    }
    setApplications((current) => current.filter((application) => application.id !== id));
    if (openId === id) setOpenId(null);
  }

  async function onCopyResume(id: string, text: string) {
    const ok = await copyText(text);
    setCopiedId(ok ? id : null);
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <main className="shell">
      <header className="masthead">
        <p className="kicker">Sreeniketh Aathreya · application atelier</p>
        <h1>Tracker</h1>
        <p className="lede">
          Every time the cloud agent writes a resume, the company, posting, generation time,
          and LaTeX source land here.
        </p>
        <Nav />
      </header>

      <section className="composer">
        <div className="tracker-toolbar">
          <label className="field" style={{ marginTop: 0, flex: 1 }}>
            <span>Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Company, role, or a phrase from the job description"
            />
          </label>
          <p className="hint tracker-count">
            {filtered.length} of {applications.length} generated
          </p>
        </div>
      </section>

      {error ? <p className="error">{error}</p> : null}

      <section className="results tracker-list">
        {loading ? <p className="hint">Loading tracker…</p> : null}
        {!loading && filtered.length === 0 ? (
          <p className="hint">
            No rows yet. Generate a resume on the Generate screen and it will appear here.
          </p>
        ) : null}

        {filtered.map((application) => {
          const open = openId === application.id;
          const received = application.responseReceived === true;
          return (
            <article key={application.id} className="tracker-row">
              <header className="tracker-row-head">
                <label className="response-check">
                  <input
                    type="checkbox"
                    checked={received}
                    onChange={(event) =>
                      void patchApplication(application.id, {
                        responseReceived: event.target.checked,
                      })
                    }
                  />
                  <span>Response</span>
                </label>
                <button
                  type="button"
                  className="tracker-toggle"
                  onClick={() => setOpenId(open ? null : application.id)}
                >
                  <strong>{application.company}</strong>
                  <span>{application.role || "Role not set"}</span>
                  <time dateTime={application.generatedAt}>
                    {formatGeneratedAt(application.generatedAt)}
                  </time>
                </button>
                <button type="button" className="ghost" onClick={() => void onDelete(application.id)}>
                  Remove
                </button>
              </header>

              {open ? (
                <div className="tracker-body">
                  <div className="row">
                    <label className="field">
                      <span>Company</span>
                      <input
                        defaultValue={application.company}
                        onBlur={(event) => {
                          if (event.target.value.trim() !== application.company) {
                            void patchApplication(application.id, { company: event.target.value });
                          }
                        }}
                      />
                    </label>
                    <label className="field">
                      <span>Role</span>
                      <input
                        defaultValue={application.role}
                        onBlur={(event) => {
                          if (event.target.value.trim() !== application.role) {
                            void patchApplication(application.id, { role: event.target.value });
                          }
                        }}
                      />
                    </label>
                  </div>

                  <label className="field">
                    <span>Job description</span>
                    <textarea readOnly value={application.jobDescription} rows={12} />
                  </label>

                  <label className="field">
                    <span>Resume LaTeX</span>
                    {application.resumeTex ? (
                      <textarea
                        readOnly
                        className="tex-field"
                        value={application.resumeTex}
                        rows={16}
                      />
                    ) : (
                      <p className="hint">No resume source was saved for this row.</p>
                    )}
                  </label>

                  <p className="hint">
                    Resume generated {formatGeneratedAt(application.generatedAt)}
                    {application.agentId ? ` · ${application.agentId}` : ""}
                    {received && application.responseReceivedAt
                      ? ` · response ${formatGeneratedAt(application.responseReceivedAt)}`
                      : ""}
                  </p>

                  <div className="toolbar">
                    <button
                      type="button"
                      disabled={!application.resumeTex}
                      onClick={() => void onCopyResume(application.id, application.resumeTex)}
                    >
                      {copiedId === application.id ? "Copied" : "Copy resume LaTeX"}
                    </button>
                    <button
                      type="button"
                      disabled={!application.resumeTex}
                      onClick={() =>
                        downloadTex(
                          `${application.company.replace(/\s+/g, "_")}_Resume.tex`,
                          application.resumeTex,
                        )
                      }
                    >
                      Download resume.tex
                    </button>
                    <button
                      type="button"
                      disabled={!application.coverLetterTex}
                      onClick={() =>
                        downloadTex(
                          `${application.company.replace(/\s+/g, "_")}_CoverLetter.tex`,
                          application.coverLetterTex,
                        )
                      }
                    >
                      Download cover letter.tex
                    </button>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </main>
  );
}
