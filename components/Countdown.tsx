"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const TARGET = new Date(siteConfig.weddingDate).getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(): { parts: Parts; done: boolean } {
  const ms = TARGET - Date.now();
  if (ms <= 0) {
    return { parts: { days: 0, hours: 0, minutes: 0, seconds: 0 }, done: true };
  }
  const s = Math.floor(ms / 1000);
  return {
    parts: {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    },
    done: false,
  };
}

/**
 * Live countdown to the Nikah (siteConfig.weddingDate). Mounted-guarded so the
 * server render and first client render match (avoids hydration mismatch).
 */
export default function Countdown() {
  const [state, setState] = useState<{ parts: Parts; done: boolean } | null>(null);

  useEffect(() => {
    setState(diff());
    const id = setInterval(() => setState(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="font-display italic text-2xl text-coral sm:text-3xl">
        Counting down to our Nikah
      </p>

      {state?.done ? (
        <p className="mt-4 font-script text-4xl text-gold sm:text-5xl">
          The day is here!
        </p>
      ) : (
        <div className="mt-6 flex items-start gap-3 sm:gap-5">
          {(
            [
              ["Days", state?.parts.days],
              ["Hours", state?.parts.hours],
              ["Minutes", state?.parts.minutes],
              ["Seconds", state?.parts.seconds],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gold/40 bg-card shadow-soft sm:h-20 sm:w-20">
                <span className="font-display text-3xl text-coral sm:text-4xl tabular-nums">
                  {value === undefined ? "––" : String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-teal sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
