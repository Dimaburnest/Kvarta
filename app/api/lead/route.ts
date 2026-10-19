import { randomUUID } from "node:crypto";
import { findDuplicateLeadId } from "@/lib/dedup";
import { getDb } from "@/lib/db";
import { validateLeadFields } from "@/lib/lead-validate";

// Node.js runtime: route uses node:fs / node:crypto via lib/db (не edge).
// `export const runtime` несовместим с cacheComponents в Next 16.

const SERVER_ERROR_MESSAGE =
  "Не удалось сохранить заявку. Напишите нам или попробуйте ещё раз.";

type LeadBody = {
  name?: unknown;
  phone?: unknown;
  interest?: unknown;
  comment?: unknown;
  attribution?: unknown;
};

export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return Response.json(
      {
        ok: false,
        field: "name",
        message: "Укажите имя — от 1 до 80 символов",
      },
      { status: 400 },
    );
  }

  const validated = validateLeadFields({
    name: body.name,
    phone: body.phone,
    interest: body.interest,
  });

  if (!validated.ok) {
    return Response.json(
      {
        ok: false,
        field: validated.error.field,
        message: validated.error.message,
      },
      { status: 400 },
    );
  }

  const comment =
    typeof body.comment === "string" ? body.comment.trim().slice(0, 1000) : "";

  const attributionJson = JSON.stringify(
    body.attribution && typeof body.attribution === "object"
      ? body.attribution
      : {},
  );

  try {
    const db = await getDb();
    const now = new Date();
    const nowIso = now.toISOString();

    const existing = await db.execute({
      sql: `SELECT id, created_at FROM leads WHERE phone = ? ORDER BY created_at DESC LIMIT 20`,
      args: [validated.phone],
    });

    const stamps = existing.rows.map((row) => ({
      id: String(row.id),
      created_at: String(row.created_at),
    }));

    const duplicateId = findDuplicateLeadId(stamps, now.getTime());
    if (duplicateId) {
      return Response.json({
        ok: true,
        id: duplicateId,
        duplicate: true,
      });
    }

    const id = randomUUID();
    await db.execute({
      sql: `INSERT INTO leads (id, created_at, name, phone, interest, comment, attribution)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        nowIso,
        validated.name,
        validated.phone,
        validated.interest,
        comment,
        attributionJson,
      ],
    });

    return Response.json({
      ok: true,
      id,
      duplicate: false,
    });
  } catch {
    return Response.json(
      {
        ok: false,
        message: SERVER_ERROR_MESSAGE,
      },
      { status: 500 },
    );
  }
}
