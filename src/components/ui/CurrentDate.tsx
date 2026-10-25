"use client";

import { useEffect, useState } from "react";

// Formatted in Colombia timezone (America/Bogota, GMT-5)
const formatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// Day, month and year, in that order: "24 octubre 2026".
function formatDate(date: globalThis.Date) {
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${get("day")} ${get("month")} ${get("year")}`;
}

// Named after the UI element; the global constructor is reached via globalThis.
export function CurrentDate() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDate = () => setDate(formatDate(new globalThis.Date()));

    updateDate();
    // Once a minute is enough to roll over at midnight.
    const interval = setInterval(updateDate, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums text-white/55">FECHA: {date || "-- ---- ----"}</span>
  );
}
