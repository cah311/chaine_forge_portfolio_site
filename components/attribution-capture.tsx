"use client";

import { useEffect } from "react";
import { captureAttributionFromUrl } from "@/lib/analytics";

/** Captures UTM + referrer once per session for CAC/funnel attribution. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromUrl(window.location.search, document.referrer);
  }, []);
  return null;
}
