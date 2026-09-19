import { readFileSync } from "node:fs";
import path from "node:path";

const PROFILE_DIR = path.join(process.cwd(), "profile");

function readProfile(name: string): string {
  return readFileSync(path.join(PROFILE_DIR, name), "utf8");
}

export function loadProfileBundle(options?: { skipCoverLetter?: boolean }): string {
  const instructions = readProfile("AGENT_INSTRUCTIONS.md");
  const links = readProfile("LINKS.md");
  const experience = readProfile("EXPERIENCE.md");
  const resumeTemplate = readProfile("resume-template.tex");
  const coverTemplate = options?.skipCoverLetter
    ? ""
    : readProfile("cover-letter-template.tex");

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
    ...(options?.skipCoverLetter
      ? []
      : [
          "",
          "## Cover letter Overleaf template (cover-letter-template.tex)",
          "```latex",
          coverTemplate,
          "```",
        ]),
  ].join("\n");
}

export function buildAgentPrompt(input: {
  jobDescription: string;
  company?: string;
  role?: string;
  skipCoverLetter?: boolean;
}): string {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return [
    loadProfileBundle({ skipCoverLetter: input.skipCoverLetter }),
    "",
    "## This application",
    `Today's date: ${today}`,
    input.company
      ? `Target company: ${input.company}. This name OVERRIDES any company mentioned in the job description. The cover letter must address ${input.company}.`
      : "Target company: infer from the job description if present.",
    input.role
      ? `Target role: ${input.role}. This title OVERRIDES any role inferred from the job description. Name this role in the cover letter opening.`
      : "Target role: infer from the job description if present.",
    input.skipCoverLetter
      ? "Cover letter: SKIP. Do not write a cover letter. Still include the <<<COVER_LETTER_TEX>>> marker, but leave that section empty."
      : "Cover letter: required. Rewrite it from scratch for THIS application. Do not reuse a previous letter, leave COMPANY_NAME, or keep % Paragraph comments. Put <<<COVER_LETTER_TEX>>> before <<<RESUME_TEX>>> so the letter cannot be truncated.",
    "",
    "## Job description",
    input.jobDescription.trim(),
    "",
    input.skipCoverLetter
      ? "Produce <<<KEYWORDS>>> then <<<COVER_LETTER_TEX>>> (empty) then <<<RESUME_TEX>>>."
      : "Produce exactly these sections in this order: <<<KEYWORDS>>>, <<<COVER_LETTER_TEX>>> (complete Overleaf cover letter), <<<RESUME_TEX>>> (complete Overleaf resume).",
  ].join("\n");
}
