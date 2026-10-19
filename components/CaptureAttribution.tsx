"use client";

import { useEffect } from "react";
import { captureAttributionOnce } from "@/lib/attribution";

export function CaptureAttribution() {
  useEffect(() => {
    captureAttributionOnce();
  }, []);

  return null;
}
