import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DEDUP_WINDOW_MS, findDuplicateLeadId } from "./dedup.ts";

describe("findDuplicateLeadId", () => {
  const now = Date.parse("2026-10-19T12:00:00.000Z");

  it("ровно на 10 минутах — ещё повтор", () => {
    const id = findDuplicateLeadId(
      [
        {
          id: "edge",
          created_at: new Date(now - DEDUP_WINDOW_MS).toISOString(),
        },
      ],
      now,
    );
    assert.equal(id, "edge");
  });

  it("на секунду старше окна — уже новая", () => {
    const id = findDuplicateLeadId(
      [
        {
          id: "old",
          created_at: new Date(now - DEDUP_WINDOW_MS - 1000).toISOString(),
        },
      ],
      now,
    );
    assert.equal(id, null);
  });

  it("свежая заявка — повтор", () => {
    const id = findDuplicateLeadId(
      [
        {
          id: "fresh",
          created_at: new Date(now - 60_000).toISOString(),
        },
      ],
      now,
    );
    assert.equal(id, "fresh");
  });

  it("пустой список — не повтор", () => {
    assert.equal(findDuplicateLeadId([], now), null);
  });
});
