import { deleteApplication, updateApplication } from "@/server/applications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: { company?: string; role?: string; responseReceived?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const application = await updateApplication(id, body);
  if (!application) {
    return Response.json({ error: "Application not found." }, { status: 404 });
  }
  return Response.json({ application });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const removed = await deleteApplication(id);
  if (!removed) {
    return Response.json({ error: "Application not found." }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}
