"use client";

import { useSearchParams } from "next/navigation";
import { parseInterestParam } from "@/lib/content";
import { LeadForm } from "./LeadForm";

/** Читает interest из URL на клиенте, без серверного searchParams. */
export function LeadFormGate() {
  const searchParams = useSearchParams();
  const initialInterest = parseInterestParam(
    searchParams.get("interest") ?? undefined,
  );

  return (
    <LeadForm key={initialInterest} initialInterest={initialInterest} />
  );
}
