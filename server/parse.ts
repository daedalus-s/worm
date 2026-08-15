export type TailoredOutput = {
  keywords: string[];
  resumeTex: string;
  coverLetterTex: string;
};

const MARKERS = {
  keywords: "<<<KEYWORDS>>>",
  resume: "<<<RESUME_TEX>>>",
  cover: "<<<COVER_LETTER_TEX>>>",
} as const;

function between(source: string, start: string, end?: string): string {
  const index = source.indexOf(start);
  if (index < 0) return "";
  const rest = source.slice(index + start.length);
  if (!end) return rest.trim();
  const stop = rest.indexOf(end);
  return (stop < 0 ? rest : rest.slice(0, stop)).trim();
}

function stripFence(block: string): string {
  return block
    .replace(/^```(?:latex|tex)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function extractDocuments(text: string): string[] {
  const docs: string[] = [];
  const pattern = /\\documentclass[\s\S]*?\\end\{document\}/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    docs.push(match[0].trim());
  }
  return docs;
}

export function parseAgentOutput(
  raw: string,
  options?: { skipCoverLetter?: boolean },
): TailoredOutput {
  const keywordsRaw = between(raw, MARKERS.keywords, MARKERS.resume);
  const resumeMarked = stripFence(between(raw, MARKERS.resume, MARKERS.cover));
  const coverMarked = stripFence(between(raw, MARKERS.cover));

  const documents = extractDocuments(raw);
  const resumeTex = resumeMarked || documents[0] || "";
  const coverLetterTex = options?.skipCoverLetter
    ? ""
    : coverMarked ||
      documents.find((doc) => /cover letter|Hiring Team|Sincerely/i.test(doc) && doc !== resumeTex) ||
      documents[1] ||
      "";

  const keywords = keywordsRaw
    .split(/[,\n]/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter((item) => item.length > 0 && !item.startsWith("<<<"));

  return { keywords, resumeTex, coverLetterTex };
}
