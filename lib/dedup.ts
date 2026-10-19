export const DEDUP_WINDOW_MS = 10 * 60 * 1000;

export type LeadStamp = {
  id: string;
  created_at: string;
};

/**
 * Чистая дедупликация: среди заявок этого телефона ищет запись
 * в окне [now - windowMs, now]. Ровно на границе окна — ещё повтор.
 */
export function findDuplicateLeadId(
  leadsForPhone: LeadStamp[],
  nowMs: number,
  windowMs: number = DEDUP_WINDOW_MS,
): string | null {
  for (const lead of leadsForPhone) {
    const createdMs = Date.parse(lead.created_at);
    if (Number.isNaN(createdMs)) {
      continue;
    }
    const ageMs = nowMs - createdMs;
    if (ageMs >= 0 && ageMs <= windowMs) {
      return lead.id;
    }
  }
  return null;
}
