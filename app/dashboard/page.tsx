"use client";

import { useEffect, useMemo, useState } from "react";
import { Nav } from "../components/Nav";
import type { ApplicationRecord } from "@/server/application-types";

type RankedRow = {
  label: string;
  applications: number;
  responses: number;
  rate: number;
};

function rankBy(applications: ApplicationRecord[], field: "company" | "role"): RankedRow[] {
  const groups = new Map<
    string,
    { label: string; applications: number; responses: number; latest: string }
  >();

  for (const application of applications) {
    const raw = application[field].trim();
    const label = field === "role" && !raw ? "Role not set" : raw || "Unspecified";
    const key = label.toLowerCase();
    const current = groups.get(key);
    const isNewer = !current || application.generatedAt > current.latest;
    groups.set(key, {
      label: isNewer ? label : current.label,
      applications: (current?.applications ?? 0) + 1,
      responses: (current?.responses ?? 0) + (application.responseReceived ? 1 : 0),
      latest: isNewer ? application.generatedAt : current.latest,
    });
  }

  return [...groups.values()]
    .map((group) => ({
      label: group.label,
      applications: group.applications,
      responses: group.responses,
      rate: group.applications === 0 ? 0 : group.responses / group.applications,
    }))
    .sort((a, b) => b.applications - a.applications || a.label.localeCompare(b.label));
}

function formatRate(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

function RankTable({ title, rows }: { title: string; rows: RankedRow[] }) {
  return (
    <section className="results rank-card">
      <h2>{title}</h2>
      {rows.length === 0 ? (
        <p className="hint">No applications yet.</p>
      ) : (
        <table className="rank-table">
          <thead>
            <tr>
              <th>{title.startsWith("Companies") ? "Company" : "Role"}</th>
              <th>Applications</th>
              <th>Responses</th>
              <th>Response rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.applications}</td>
                <td>{row.responses}</td>
                <td>{formatRate(row.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/applications");
        if (!response.ok) throw new Error("Could not load applications.");
        const payload = (await response.json()) as { applications: ApplicationRecord[] };
        if (!cancelled) setApplications(payload.applications);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load the dashboard.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const companies = useMemo(() => rankBy(applications, "company"), [applications]);
  const roles = useMemo(() => rankBy(applications, "role"), [applications]);
  const responses = applications.filter((application) => application.responseReceived).length;
  const distinctCompanies = companies.filter((row) => row.label !== "Unspecified").length;
  const distinctRoles = roles.filter((row) => row.label !== "Role not set").length;

  return (
    <main className="shell">
      <header className="masthead">
        <p className="kicker">Sreeniketh Aathreya · application atelier</p>
        <h1>Dashboard</h1>
        <p className="lede">
          Companies and roles you have generated materials for the most, plus how often a
          response came back.
        </p>
        <Nav />
      </header>

      {error ? <p className="error">{error}</p> : null}
      {loading ? <p className="hint">Loading dashboard…</p> : null}

      <section className="stat-grid">
        <article className="stat-card">
          <span>Applications</span>
          <strong>{applications.length}</strong>
        </article>
        <article className="stat-card">
          <span>Companies</span>
          <strong>{distinctCompanies}</strong>
        </article>
        <article className="stat-card">
          <span>Roles</span>
          <strong>{distinctRoles}</strong>
        </article>
        <article className="stat-card">
          <span>Responses</span>
          <strong>{responses}</strong>
        </article>
      </section>

      <RankTable title="Companies applied to most" rows={companies} />
      <RankTable title="Roles applied to most" rows={roles} />
    </main>
  );
}
