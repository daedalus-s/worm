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

function firstDocument(block: string): string {
  const trimmed = stripFence(block);
  if (!trimmed) return "";
  return extractDocuments(trimmed)[0] || trimmed;
}

function sliceAfterMarker(source: string, marker: string, others: string[]): string {
  const start = source.lastIndexOf(marker);
  if (start < 0) return "";
  const from = start + marker.length;
  let end = source.length;
  for (const other of others) {
    const at = source.indexOf(other, from);
    if (at >= 0 && at < end) end = at;
  }
  return source.slice(from, end);
}

function isStubCover(doc: string): boolean {
  return /COMPANY\\?_NAME/.test(doc) || /% Paragraph 1:/.test(doc);
}

function isCoverLetterDoc(doc: string, resumeTex: string): boolean {
  if (!doc || doc === resumeTex || isStubCover(doc)) return false;
  if (/\\section\{Work Experience\}/i.test(doc)) return false;
  return /Sincerely|Dear Hiring|cover letter/i.test(doc);
}

export function parseAgentOutput(
  raw: string,
  options?: { skipCoverLetter?: boolean },
): TailoredOutput {
  const keywordsRaw = sliceAfterMarker(raw, MARKERS.keywords, [
    MARKERS.resume,
    MARKERS.cover,
  ]);
  const resumeMarked = firstDocument(
    sliceAfterMarker(raw, MARKERS.resume, [MARKERS.cover, MARKERS.keywords]),
  );
  const coverMarked = firstDocument(
    sliceAfterMarker(raw, MARKERS.cover, [MARKERS.resume, MARKERS.keywords]),
  );

  const documents = extractDocuments(raw);
  const resumeTex = resumeMarked || documents[0] || "";
  const coverLetterTex = options?.skipCoverLetter
    ? ""
    : (!isStubCover(coverMarked) && coverMarked) ||
      documents.find((doc) => isCoverLetterDoc(doc, resumeTex)) ||
      "";

  const keywords = keywordsRaw
    .split(/[,\n]/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter((item) => item.length > 0 && !item.startsWith("<<<"));

  return { keywords, resumeTex, coverLetterTex };
}
