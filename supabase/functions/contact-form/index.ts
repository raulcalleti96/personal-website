import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CONTACT_TO_EMAIL = Deno.env.get("CONTACT_TO_EMAIL");
// With a verified domain in Resend use e.g. "Web <contacto@tudominio.com>".
// "onboarding@resend.dev" only delivers to the email the Resend account was created with.
const CONTACT_FROM_EMAIL = Deno.env.get("CONTACT_FROM_EMAIL") ?? "Web <onboarding@resend.dev>";

const ALLOWED_ORIGINS = [
  "https://personal-website-89a20.web.app",
  "https://personal-website-89a20.firebaseapp.com",
  "https://raulnextech.com",
  "https://www.raulnextech.com",
  "https://rsnextech.com",
  "https://www.rsnextech.com",
  "http://localhost:3000",
];

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true }, 200, origin);
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || name.length > 120) return json({ error: "Invalid name" }, 400, origin);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return json({ error: "Invalid email" }, 400, origin);
  }
  if (!message || message.length > 5000) return json({ error: "Invalid message" }, 400, origin);

  // Crude global rate limit: at most 5 messages per 10 minutes.
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since);
  if ((count ?? 0) >= 5) return json({ error: "Too many messages, try again later" }, 429, origin);

  const { data: row, error: insertError } = await supabase
    .from("contact_messages")
    .insert({ name, email, message })
    .select("id")
    .single();
  if (insertError) {
    console.error("contact_messages insert failed", insertError);
    return json({ error: "Could not save message" }, 500, origin);
  }

  // The message is already stored; a failed email must not lose it.
  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Nuevo mensaje de ${name}`,
        html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) ha escrito desde la web:</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });
    if (res.ok) {
      await supabase.from("contact_messages").update({ emailed: true }).eq("id", row.id);
    } else {
      console.error("Resend failed", res.status, await res.text());
    }
  } else {
    console.error("RESEND_API_KEY / CONTACT_TO_EMAIL not set; message stored only");
  }

  return json({ ok: true }, 200, origin);
});
