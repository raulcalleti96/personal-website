import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const TELEGRAM_WEBHOOK_SECRET = Deno.env.get("TELEGRAM_WEBHOOK_SECRET")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function replyTelegram(chatId: number, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) {
    console.error("Telegram sendMessage failed", res.status, await res.text());
  }
}

Deno.serve(async (req) => {
  if (req.headers.get("X-Telegram-Bot-Api-Secret-Token") !== TELEGRAM_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const update = await req.json();
  const message = update.message;
  if (!message?.text) return new Response("ok");

  const chatId: number = message.chat.id;
  const text: string = message.text.trim();

  const { data: link } = await supabase
    .from("telegram_links")
    .select("user_id")
    .eq("chat_id", chatId)
    .maybeSingle();

  if (!link) {
    await replyTelegram(
      chatId,
      `Tu Chat ID es: ${chatId}\nPégalo en el portal, en Brain → Conectar Telegram.`
    );
    return new Response("ok");
  }

  if (text === "/start") {
    await replyTelegram(chatId, "¡Ya estás conectado! Envíame cualquier idea y la guardaré.");
    return new Response("ok");
  }

  const { error } = await supabase
    .from("brain_notes")
    .insert({ user_id: link.user_id, content: text });

  await replyTelegram(chatId, error ? "❌ No se pudo guardar, inténtalo de nuevo." : "✅ Guardado");

  return new Response("ok");
});
