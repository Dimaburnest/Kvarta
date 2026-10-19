import { formCopy, type Interest } from "./content";
import { normalizeBelarusPhone } from "./phone";

export type LeadField = "name" | "phone" | "interest";

export type LeadValidationError = {
  field: LeadField;
  message: string;
};

const INTERESTS: Interest[] = ["subscription", "one_time", "question"];

export function validateLeadFields(input: {
  name: unknown;
  phone: unknown;
  interest: unknown;
}):
  | { ok: true; name: string; phone: string; interest: Interest }
  | { ok: false; error: LeadValidationError } {
  if (typeof input.name !== "string") {
    return {
      ok: false,
      error: { field: "name", message: formCopy.nameError },
    };
  }

  const name = input.name.trim();
  if (name.length < 1 || name.length > 80) {
    return {
      ok: false,
      error: { field: "name", message: formCopy.nameError },
    };
  }

  if (typeof input.phone !== "string") {
    return {
      ok: false,
      error: { field: "phone", message: formCopy.phoneError },
    };
  }

  const phoneResult = normalizeBelarusPhone(input.phone);
  if (!phoneResult.ok) {
    return {
      ok: false,
      error: { field: "phone", message: formCopy.phoneError },
    };
  }

  if (
    typeof input.interest !== "string" ||
    !INTERESTS.includes(input.interest as Interest)
  ) {
    return {
      ok: false,
      error: {
        field: "interest",
        message: "Выберите подписку, разовый заказ или вопрос",
      },
    };
  }

  return {
    ok: true,
    name,
    phone: phoneResult.normalized,
    interest: input.interest as Interest,
  };
}
