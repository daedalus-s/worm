import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ApplicationRecord } from "./application-types";

export type { ApplicationRecord } from "./application-types";

export type ApplicationInput = {
  company?: string;
  role?: string;
  jobDescription: string;
  keywords?: string[];
  resumeTex?: string;
  coverLetterTex?: string;
  responseReceived?: boolean;
  responseReceivedAt?: string;
  agentId?: string;
  runId?: string;
  generatedAt?: string;
};

export type ApplicationPatch = Partial<
  Pick<ApplicationRecord, "company" | "role" | "responseReceived" | "responseReceivedAt">
>;

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "applications.json");

async function readAll(): Promise<ApplicationRecord[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRecord).map(normalizeRecord);
  } catch (error) {
    if (isMissingFile(error)) return [];
    throw error;
  }
}

async function writeAll(records: ApplicationRecord[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_PATH, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

export async function listApplications(): Promise<ApplicationRecord[]> {
  const records = await readAll();
  return records.sort((a, b) => b.generatedAt.localeCompare(a.generatedAt));
}

export async function addApplication(input: ApplicationInput): Promise<ApplicationRecord> {
  const record: ApplicationRecord = {
    id: crypto.randomUUID(),
    company: input.company?.trim() || "Unspecified",
    role: input.role?.trim() || "",
    jobDescription: input.jobDescription.trim(),
    generatedAt: input.generatedAt ?? new Date().toISOString(),
    keywords: input.keywords ?? [],
    resumeTex: input.resumeTex ?? "",
    coverLetterTex: input.coverLetterTex ?? "",
    responseReceived: input.responseReceived ?? false,
    responseReceivedAt: input.responseReceived ? input.responseReceivedAt : undefined,
    agentId: input.agentId,
    runId: input.runId,
  };

  const records = await readAll();
  records.unshift(record);
  await writeAll(records);
  return record;
}

export async function updateApplication(
  id: string,
  patch: ApplicationPatch,
): Promise<ApplicationRecord | null> {
  const records = await readAll();
  const index = records.findIndex((record) => record.id === id);
  if (index < 0) return null;

  const current = records[index];
  const responseReceived =
    patch.responseReceived !== undefined ? patch.responseReceived : current.responseReceived;
  const next: ApplicationRecord = {
    ...current,
    company: patch.company?.trim() || current.company,
    role: patch.role !== undefined ? patch.role.trim() : current.role,
    responseReceived,
    responseReceivedAt: responseReceived
      ? patch.responseReceivedAt ?? current.responseReceivedAt ?? new Date().toISOString()
      : undefined,
  };
  records[index] = next;
  await writeAll(records);
  return next;
}

export async function deleteApplication(id: string): Promise<boolean> {
  const records = await readAll();
  const next = records.filter((record) => record.id !== id);
  if (next.length === records.length) return false;
  await writeAll(next);
  return true;
}

function normalizeRecord(record: ApplicationRecord): ApplicationRecord {
  return {
    ...record,
    keywords: record.keywords ?? [],
    resumeTex: record.resumeTex ?? "",
    coverLetterTex: record.coverLetterTex ?? "",
    responseReceived: record.responseReceived === true,
    responseReceivedAt: record.responseReceived ? record.responseReceivedAt : undefined,
  };
}

function isRecord(value: unknown): value is ApplicationRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as ApplicationRecord;
  return (
    typeof record.id === "string" &&
    typeof record.company === "string" &&
    typeof record.jobDescription === "string" &&
    typeof record.generatedAt === "string"
  );
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}
