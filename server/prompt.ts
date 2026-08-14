import { readFileSync } from "node:fs";
import path from "node:path";

const PROFILE_DIR = path.join(process.cwd(), "profile");

function readProfile(name: string): string {
  return readFileSync(path.join(PROFILE_DIR, name), "utf8");
}

export function loadProfileBundle(): string {
  const instructions = readProfile("AGENT_INSTRUCTIONS.md");
  const links = readProfile("LINKS.md");
  const experience = readProfile("EXPERIENCE.md");
  const resumeTemplate = readProfile("resume-template.tex");
  const coverTemplate = readProfile("cover-letter-template.tex");

  return [
    instructions,
    "",
    "## Canonical links",
    links,
    "",
    "## Experience corpus",
    experience,
    "",
    "## Master Overleaf resume template (resume-template.tex)",
    "```latex",
    resumeTemplate,
    "```",
    "",
    "## Cover letter Overleaf template (cover-letter-template.tex)",
    "```latex",
    coverTemplate,
    "```",
  ].join("\n");
}

export function buildAgentPrompt(input: {
  jobDescription: string;
  company?: string;
  role?: string;
}): string {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return [
    loadProfileBundle(),
    "",
    "## This application",
    `Today's date: ${today}`,
    input.company ? `Target company: ${input.company}` : "Target company: infer from the job description if present.",
    input.role ? `Target role: ${input.role}` : "Target role: infer from the job description if present.",
    "",
    "## Job description",
    input.jobDescription.trim(),
    "",
    "Produce the three marked sections now.",
  ].join("\n");
}
