"use client";

import { useState, type FormEvent } from "react";
import { buildLeadAttribution } from "@/lib/attribution";
import {
  formCopy,
  interestOptions,
  type Interest,
} from "@/lib/content";
import { normalizeBelarusPhone } from "@/lib/phone";
import { submitLead } from "@/lib/submit-lead";

type FieldErrors = {
  name?: string;
  phone?: string;
  interest?: string;
  comment?: string;
};

type Props = {
  initialInterest: Interest;
};

export function LeadForm({ initialInterest }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<Interest>(initialInterest);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure(null);

    const trimmedName = name.trim();
    const nextErrors: FieldErrors = {};

    if (trimmedName.length < 1 || trimmedName.length > 80) {
      nextErrors.name = formCopy.nameError;
    }

    const phoneResult = normalizeBelarusPhone(phone);
    if (!phoneResult.ok) {
      nextErrors.phone = formCopy.phoneError;
    }

    if (comment.length > 1000) {
      nextErrors.comment = formCopy.commentError;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    const result = await submitLead({
      name: trimmedName,
      phone: phoneResult.ok ? phoneResult.normalized : phone,
      interest,
      comment: comment.trim(),
      attribution: buildLeadAttribution(window.location.href),
    });
    setSubmitting(false);

    if (result.ok) {
      setSuccessMessage(
        result.duplicate
          ? formCopy.successDuplicate
          : formCopy.success(trimmedName),
      );
      return;
    }

    if ("field" in result) {
      setErrors({ [result.field]: result.message });
      return;
    }

    setFailure(formCopy.failure);
  }

  if (successMessage) {
    return (
      <p className="form-status" role="status">
        {successMessage}
      </p>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="lead-name">{formCopy.nameLabel}</label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
          suppressHydrationWarning
        />
        {errors.name ? (
          <p id="lead-name-error" className="field__error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="lead-phone">{formCopy.phoneLabel}</label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={
            errors.phone ? "lead-phone-error" : "lead-phone-hint"
          }
          suppressHydrationWarning
        />
        {errors.phone ? (
          <p id="lead-phone-error" className="field__error" role="alert">
            {errors.phone}
          </p>
        ) : (
          <p id="lead-phone-hint" className="field__hint">
            {formCopy.phoneHint}
          </p>
        )}
      </div>

      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>{formCopy.interestLabel}</legend>
        <div className="interest-options">
          {interestOptions.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="interest"
                value={option.value}
                checked={interest === option.value}
                onChange={() => setInterest(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.interest ? (
          <p className="field__error" role="alert">
            {errors.interest}
          </p>
        ) : null}
      </fieldset>

      <div className="field">
        <label htmlFor="lead-comment">{formCopy.commentLabel}</label>
        <textarea
          id="lead-comment"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? "lead-comment-error" : undefined}
          suppressHydrationWarning
        />
        {errors.comment ? (
          <p id="lead-comment-error" className="field__error" role="alert">
            {errors.comment}
          </p>
        ) : null}
      </div>

      {failure ? (
        <p className="form-status form-status--error" role="alert">
          {failure}
        </p>
      ) : null}

      <button className="btn-submit" type="submit" disabled={submitting}>
        {submitting ? formCopy.submitting : formCopy.submit}
      </button>
    </form>
  );
}
