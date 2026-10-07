import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getFrom, getResend } from "@/lib/email";
import { logError } from "@/lib/log";
import { contactCapabilities, contactSchema, createIpLimiter, topicLabel, type ContactResult } from "@/lib/contact";

// Five messages per hour from one address, held in this instance's memory (no outside service).
const ipLimiter = createIpLimiter(5, 60 * 60 * 1000);

const reply = (body: ContactResult, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!ipLimiter.take(`contact:${ip}`)) return reply({ ok: false, error: "rate_limited" }, 429);

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return reply({ ok: false, error: "invalid" }, 422);
  const d = parsed.data;

  // Honeypot: look like a success to a bot, keep and send nothing.
  if (d.website) return reply({ ok: true, delivered: true, stored: false });

  const caps = contactCapabilities(process.env, Boolean(prisma));
  if (!caps.deliver && !caps.store) return reply({ ok: false, error: "not_available" }, 503);

  let stored = false;
  if (caps.store && prisma) {
    try {
      await prisma.partnerInquiry.create({
        data: { name: d.name, email: d.email.toLowerCase(), organization: d.from ? `via ${d.from}` : null, kind: `contact:${d.topic}`, message: d.message },
      });
      stored = true;
    } catch (err) {
      logError("contact.store", err);
    }
  }

  let delivered = false;
  const resend = getResend();
  const from = getFrom();
  const to = process.env.CONTACT_TO;
  if (caps.deliver && resend && from && to) {
    try {
      const result = await resend.emails.send({
        from,
        to,
        replyTo: d.email,
        subject: `Contact form: ${topicLabel(d.topic)}`,
        text: [`Name: ${d.name}`, `Email: ${d.email}`, `Topic: ${topicLabel(d.topic)}`, `From site: ${d.from || "not given"}`, "", d.message].join("\n"),
      });
      delivered = !result.error;
    } catch (err) {
      logError("contact.deliver", err);
    }
  }

  if (!stored && !delivered) return reply({ ok: false, error: "not_available" }, 503);
  return reply({ ok: true, delivered, stored });
}
