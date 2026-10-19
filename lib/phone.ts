export type PhoneResult =
  | { ok: true; normalized: string }
  | { ok: false };

const MOBILE = /^(25|29|33|44)\d{7}$/;
const MINSK = /^17\d{7}$/;
const REGIONAL = /^(162|212|232|152|222)\d{6}$/;

function isValidNational(national: string): boolean {
  return MOBILE.test(national) || MINSK.test(national) || REGIONAL.test(national);
}

/**
 * Нормализует белорусский номер в +375 и 9 цифр национального номера.
 * Без React и Node — можно вызывать на сервере.
 */
export function normalizeBelarusPhone(input: string): PhoneResult {
  const digits = input.replace(/[\s()\-]/g, "");

  if (!digits) {
    return { ok: false };
  }

  if (/^\+?7/.test(digits) || /^8(?!0)/.test(digits)) {
    return { ok: false };
  }

  let national: string | null = null;

  if (digits.startsWith("+375")) {
    national = digits.slice(4);
  } else if (digits.startsWith("375")) {
    national = digits.slice(3);
  } else if (digits.startsWith("80") && digits.length === 11) {
    national = digits.slice(2);
  } else {
    return { ok: false };
  }

  if (!/^\d{9}$/.test(national) || !isValidNational(national)) {
    return { ok: false };
  }

  return { ok: true, normalized: `+375${national}` };
}
