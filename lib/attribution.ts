export const ATTR_STORAGE_KEY = "kvarta_attr";

export type LandingAttribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  yclid: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  landing_path: string | null;
  landing_url: string | null;
};

export type LeadAttribution = LandingAttribution & {
  page_url: string | null;
};

function paramOrNull(params: URLSearchParams, key: string): string | null {
  const value = params.get(key);
  return value && value.length > 0 ? value : null;
}

export function buildLandingAttribution(
  href: string,
  referrer: string,
): LandingAttribution {
  const url = new URL(href);
  const params = url.searchParams;

  return {
    utm_source: paramOrNull(params, "utm_source"),
    utm_medium: paramOrNull(params, "utm_medium"),
    utm_campaign: paramOrNull(params, "utm_campaign"),
    utm_content: paramOrNull(params, "utm_content"),
    utm_term: paramOrNull(params, "utm_term"),
    yclid: paramOrNull(params, "yclid"),
    gclid: paramOrNull(params, "gclid"),
    fbclid: paramOrNull(params, "fbclid"),
    referrer: referrer || null,
    landing_path: `${url.pathname}${url.search}` || null,
    landing_url: href || null,
  };
}

/** Пишет sessionStorage один раз; если ключ уже есть — не затирает. */
export function captureAttributionOnce(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (sessionStorage.getItem(ATTR_STORAGE_KEY)) {
      return;
    }
    const payload = buildLandingAttribution(
      window.location.href,
      document.referrer,
    );
    sessionStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage может быть недоступен — тихо пропускаем
  }
}

export function readStoredAttribution(): LandingAttribution {
  const empty: LandingAttribution = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    yclid: null,
    gclid: null,
    fbclid: null,
    referrer: null,
    landing_path: null,
    landing_url: null,
  };

  if (typeof window === "undefined") {
    return empty;
  }

  try {
    const raw = sessionStorage.getItem(ATTR_STORAGE_KEY);
    if (!raw) {
      return empty;
    }
    const parsed = JSON.parse(raw) as Partial<LandingAttribution>;
    return {
      utm_source: parsed.utm_source ?? null,
      utm_medium: parsed.utm_medium ?? null,
      utm_campaign: parsed.utm_campaign ?? null,
      utm_content: parsed.utm_content ?? null,
      utm_term: parsed.utm_term ?? null,
      yclid: parsed.yclid ?? null,
      gclid: parsed.gclid ?? null,
      fbclid: parsed.fbclid ?? null,
      referrer: parsed.referrer ?? null,
      landing_path: parsed.landing_path ?? null,
      landing_url: parsed.landing_url ?? null,
    };
  } catch {
    return empty;
  }
}

export function buildLeadAttribution(pageUrl: string): LeadAttribution {
  return {
    ...readStoredAttribution(),
    page_url: pageUrl || null,
  };
}
