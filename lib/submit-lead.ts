import type { LeadAttribution } from "./attribution";
import type { Interest } from "./content";

export type LeadPayload = {
  name: string;
  phone: string;
  interest: Interest;
  comment: string;
  attribution: LeadAttribution;
};

export type SubmitLeadResult =
  | { ok: true; id: string; duplicate: boolean }
  | { ok: false; field: "name" | "phone" | "interest"; message: string }
  | { ok: false; error: string };

export async function submitLead(
  payload: LeadPayload,
): Promise<SubmitLeadResult> {
  let response: Response;

  try {
    response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        interest: payload.interest,
        comment: payload.comment,
        attribution: payload.attribution,
      }),
    });
  } catch {
    return { ok: false, error: "network" };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { ok: false, error: "server" };
  }

  if (response.status === 200) {
    const body = data as { ok?: boolean; id?: string; duplicate?: boolean };
    if (body.ok && typeof body.id === "string") {
      return {
        ok: true,
        id: body.id,
        duplicate: Boolean(body.duplicate),
      };
    }
    return { ok: false, error: "server" };
  }

  if (response.status === 400) {
    const body = data as {
      ok?: boolean;
      field?: "name" | "phone" | "interest";
      message?: string;
    };
    if (
      body.field === "name" ||
      body.field === "phone" ||
      body.field === "interest"
    ) {
      return {
        ok: false,
        field: body.field,
        message:
          typeof body.message === "string" ? body.message : "Проверьте поле",
      };
    }
    return { ok: false, error: "server" };
  }

  return { ok: false, error: "server" };
}
