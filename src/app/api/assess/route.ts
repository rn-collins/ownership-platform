import { NextResponse } from "next/server";
import { z } from "zod";
import { assess, type Responses, type Aggregation } from "@/lib/engine";

// Stateless scoring endpoint. Pure: responses in, reproducible score out.
// No storage, no identity. The engine is the only path to a score.
const schema = z.object({
  responses: z.record(z.string(), z.number().min(0).max(5)),
  aggregation: z.enum(["additive", "geometric"]).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 422 });
  }
  const result = assess(parsed.data.responses as Responses, {
    aggregation: parsed.data.aggregation as Aggregation | undefined,
  });
  return NextResponse.json(result);
}
