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

function section(source: string, start: string, ...stops: string[]): string {
  const index = source.indexOf(start);
  if (index < 0) return "";
  const rest = source.slice(index + start.length);
  let end = rest.length;
  for (const stop of stops) {
    const at = rest.indexOf(stop);
    if (at >= 0 && at < end) end = at;
  }
  return rest.slice(0, end).trim();
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
  const keywordsRaw = section(raw, MARKERS.keywords, MARKERS.resume, MARKERS.cover);
  const resumeMarked = stripFence(section(raw, MARKERS.resume, MARKERS.cover, MARKERS.keywords));
  const coverMarked = stripFence(section(raw, MARKERS.cover, MARKERS.resume, MARKERS.keywords));

  const documents = extractDocuments(raw);
  const resumeDocs = extractDocuments(resumeMarked);
  const coverDocs = extractDocuments(coverMarked);

  const resumeTex =
    resumeDocs[0] ||
    resumeMarked ||
    documents.find((doc) => /Professional Summary|Work Experience/i.test(doc)) ||
    documents[0] ||
    "";
  const coverLetterTex = options?.skipCoverLetter
    ? ""
    : coverDocs[0] ||
      coverMarked ||
      documents.find((doc) => /cover letter|Hiring Team|Sincerely/i.test(doc) && doc !== resumeTex) ||
      documents[1] ||
      "";

  const keywords = keywordsRaw
    .split(/[,\n]/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter((item) => item.length > 0 && !item.startsWith("<<<"));

  return { keywords, resumeTex, coverLetterTex };
}
