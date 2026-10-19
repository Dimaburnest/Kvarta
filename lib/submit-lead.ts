import type { Interest } from "./content";

export type LeadPayload = {
  name: string;
  phone: string;
  interest: Interest;
  comment: string;
};

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string };

/** Пока без API и базы — возвращает сбой, чтобы в форме было видно состояние ошибки. */
export async function submitLead(
  _payload: LeadPayload,
): Promise<SubmitLeadResult> {
  return { ok: false, error: "Приём заявок ещё не подключён" };
}
