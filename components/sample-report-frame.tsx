"use client";

import { useEffect, useRef, useState } from "react";

export function SampleReportFrame() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(3200);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;

    let ro: ResizeObserver | null = null;

    const syncHeight = () => {
      try {
        const doc = frame.contentDocument;
        const next =
          doc?.documentElement?.scrollHeight ?? doc?.body?.scrollHeight;
        if (next && next > 400) setHeight(next + 24);
      } catch {
        /* same-origin only */
      }
    };

    const onLoad = () => {
      syncHeight();
      ro?.disconnect();
      const body = frame.contentDocument?.body;
      if (body && typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(syncHeight);
        ro.observe(body);
      }
    };

    frame.addEventListener("load", onLoad);
    if (frame.contentDocument?.readyState === "complete") onLoad();

    return () => {
      frame.removeEventListener("load", onLoad);
      ro?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src="/sample-report.html"
      title="Sample AI Tools Assessment report for Prairie Peak Exteriors"
      className="w-full border border-hair rounded-[14px] bg-[#f4ead9] block overflow-hidden"
      style={{ height }}
    />
  );
}
