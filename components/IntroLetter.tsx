"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import Envelope from "@/components/decor/Envelope";

type Phase = "closed" | "opening";

/**
 * "Goa Sunset" letter intro — a single animation. A crafted envelope sits on a
 * warm wash; on tap the flap opens (CSS 3D) and the whole overlay dissolves to
 * reveal the invitation. No video.
 *
 * The first real section (#invitation) sits behind this fixed overlay, so
 * dismissal is a true cross-fade. Scroll is locked while open.
 */
export default function IntroLetter() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [closing, setClosing] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed]);

  const finish = () => {
    setClosing(true);
    window.setTimeout(() => setDismissed(true), 750);
  };

  const open = () => {
    if (phase !== "closed") return;
    // Start background music in the same user gesture (sound on).
    window.dispatchEvent(new Event("intro:open"));
    setPhase("opening");
    // let the flap open, then dissolve to the invitation
    window.setTimeout(finish, reducedRef.current ? 250 : 1500);
  };

  const onOverlayClick = () => {
    if (phase === "closed") open();
    else finish(); // tap again to skip
  };

  if (dismissed) return null;

  return (
    <div
      onClick={onOverlayClick}
      role="dialog"
      aria-label="Wedding invitation"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700"
      style={{ opacity: closing ? 0 : 1, pointerEvents: closing ? "none" : "auto" }}
    >
      {/* warm Goa-sunset wash + faint sun glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 8%, #FDEBD2 0%, #F7D9BE 40%, #EFC4AD 72%, #E7B9A6 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 28% at 50% 14%, rgba(255,236,196,0.9), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex animate-fade-up flex-col items-center px-4">
        <div style={{ perspective: 1400 }}>
          <div className={phase === "closed" ? "float-soft" : ""}>
            <Envelope open={phase !== "closed"} width={380} />
          </div>
        </div>

        {/* wordmark */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="gold-shimmer font-script text-5xl leading-none sm:text-6xl">
            {siteConfig.couple.groom.firstName} &amp; {siteConfig.couple.bride.firstName}
          </p>
          <div className="mt-1 flex items-center gap-3 text-gold/70">
            <span className="h-px w-10 bg-gold/50" />
            <span aria-hidden>✦</span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-teal-deep">
            Goa · October 2026
          </p>
        </div>

        {/* tap-to-open cue */}
        {phase === "closed" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
            aria-label={`${siteConfig.intro.openLabel} — open the invitation`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card/70 px-5 py-2 font-sans text-sm uppercase tracking-[0.3em] text-coral shadow-soft backdrop-blur transition hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral/50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
            </span>
            {siteConfig.intro.openLabel}
          </button>
        )}
      </div>
    </div>
  );
}
