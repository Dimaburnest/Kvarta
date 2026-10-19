import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeBelarusPhone } from "./phone.ts";

describe("normalizeBelarusPhone", () => {
  it("принимает +375 и нормализует", () => {
    const result = normalizeBelarusPhone("+375291234567");
    assert.deepEqual(result, { ok: true, normalized: "+375291234567" });
  });

  it("принимает префикс 80", () => {
    const result = normalizeBelarusPhone("80291234567");
    assert.deepEqual(result, { ok: true, normalized: "+375291234567" });
  });

  it("игнорирует пробелы и скобки", () => {
    const result = normalizeBelarusPhone("+375 (29) 123-45-67");
    assert.deepEqual(result, { ok: true, normalized: "+375291234567" });
  });

  it("принимает Минск 17", () => {
    const result = normalizeBelarusPhone("+375 17 123-45-67");
    assert.deepEqual(result, { ok: true, normalized: "+375171234567" });
  });

  it("принимает Брест 162", () => {
    const result = normalizeBelarusPhone("375162123456");
    assert.deepEqual(result, { ok: true, normalized: "+375162123456" });
  });

  it("отклоняет российский номер", () => {
    assert.equal(normalizeBelarusPhone("+7 999 123-45-67").ok, false);
    assert.equal(normalizeBelarusPhone("89991234567").ok, false);
  });

  it("отклоняет короткий номер", () => {
    assert.equal(normalizeBelarusPhone("+375 29 123").ok, false);
  });

  it("отклоняет пустую строку", () => {
    assert.equal(normalizeBelarusPhone("").ok, false);
    assert.equal(normalizeBelarusPhone("   ").ok, false);
  });
});
