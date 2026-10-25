"use client";

import { useEffect, useState } from "react";

// Formatted in Colombia timezone (America/Bogota, GMT-5)
const formatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export function LiveTimeClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => setTime(formatter.format(new Date()));

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-2">
      <span className="tabular-nums text-white/55">HORA: {time || "--:--:--"}</span>
    </span>
  );
}
