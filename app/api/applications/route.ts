import { addApplication, listApplications } from "@/server/applications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const applications = await listApplications();
  return Response.json({ applications });
}

export async function POST(request: Request) {
  let body: {
    company?: string;
    role?: string;
    jobDescription?: string;
    keywords?: string[];
    resumeTex?: string;
    coverLetterTex?: string;
    agentId?: string;
    runId?: string;
    generatedAt?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const jobDescription = body.jobDescription?.trim() ?? "";
  if (!jobDescription) {
    return Response.json({ error: "A job description is required." }, { status: 400 });
  }

  const application = await addApplication({
    company: body.company,
    role: body.role,
    jobDescription,
    keywords: body.keywords,
    resumeTex: body.resumeTex,
    coverLetterTex: body.coverLetterTex,
    agentId: body.agentId,
    runId: body.runId,
    generatedAt: body.generatedAt,
  });

  return Response.json({ application }, { status: 201 });
}
