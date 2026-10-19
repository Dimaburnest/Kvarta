import { interestOptions, type Interest } from "./content";

type AttributionBits = {
  utm_source?: unknown;
  utm_content?: unknown;
  yclid?: unknown;
  page_url?: unknown;
};

function interestLabel(interest: Interest): string {
  return (
    interestOptions.find((option) => option.value === interest)?.label ??
    interest
  );
}

function textOrDash(value: unknown): string {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  return "—";
}

export async function notifyTelegramNewLead(input: {
  name: string;
  phone: string;
  interest: Interest;
  comment: string;
  attributionJson: string;
}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return;
  }

  let attribution: AttributionBits = {};
  try {
    attribution = JSON.parse(input.attributionJson) as AttributionBits;
  } catch {
    attribution = {};
  }

  const text = [
    "Новая заявка «Кварта»",
    `Имя: ${input.name}`,
    `Телефон: ${input.phone}`,
    `Интерес: ${interestLabel(input.interest)}`,
    `Комментарий: ${input.comment.trim() || "—"}`,
    `utm_source: ${textOrDash(attribution.utm_source)}`,
    `utm_content: ${textOrDash(attribution.utm_content)}`,
    `yclid: ${textOrDash(attribution.yclid)}`,
    `page_url: ${textOrDash(attribution.page_url)}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      },
    );

    if (!response.ok) {
      const body = await response.text();
      console.error("Telegram notify failed:", response.status, body);
    }
  } catch (error) {
    console.error("Telegram notify failed:", error);
  }
}
