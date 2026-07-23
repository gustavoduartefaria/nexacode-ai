"use client";

import { useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function campaignFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    UTM_KEYS.map((key) => [key, (params.get(key) ?? "").slice(0, 120)]).filter(([, value]) => value),
  );
}

function send(event: string, metadata: Record<string, string> = {}) {
  void fetch("/api/marketing/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      path: window.location.pathname,
      campaign: campaignFromUrl(),
      metadata,
    }),
    keepalive: true,
  }).catch(() => undefined);
}

export default function MarketingTracker() {
  useEffect(() => {
    send("page_view");
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-marketing-event]")
        : null;
      if (!target) return;
      send(target.dataset.marketingEvent ?? "cta_click", {
        label: (target.dataset.marketingLabel ?? target.textContent ?? "").trim().slice(0, 120),
        destination: target instanceof HTMLAnchorElement ? target.pathname : "",
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
