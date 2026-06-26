"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import Envelope from "@/components/decor/Envelope";

type Phase = "closed" | "opening" | "playing";

/**
 * "Goa Sunset" letter intro. A crafted envelope sits on a warm wash; on tap the
 * flap opens (CSS 3D), the video plays underneath, then the whole overlay
 * dissolves into the invitation.
 *
 * Flow: closed → opening (flap rotates, video.play() fired in the same gesture
 * so audio is unblocked) → playing (cross-fade to full-screen video) → dismiss
 * on `ended`/skip. The first real section (#invitation) sits behind this fixed
 * overlay, so dismissal is a true cross-fade. Scroll is locked while open.
 */
export default function IntroLetter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [closing, setClosing] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Lock body scroll while visible.
  useEffect(() => {
    if (dismissed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dismissed]);

  // Escape skips (accessible).
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

  const open = async () => {
    if (phase !== "closed") return;
    setPhase("opening");
    const video = videoRef.current;
    let canPlay = false;
    if (video) {
      try {
        video.muted = false;
        await video.play();
        canPlay = true;
      } catch {
        setPlayFailed(true);
      }
    }
    const delay = reducedRef.current ? 60 : 1150;
    window.setTimeout(() => {
      if (canPlay) setPhase("playing");
      else finish(); // can't play (codec/autoplay) → dissolve to invitation
    }, delay);
  };

  const onOverlayClick = () => {
    if (phase === "closed") open();
    else finish(); // tap again to skip
  };

  if (dismissed) return null;

  const showEnvelope = phase !== "playing";

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
            "radial-gradient(120% 80% at 50% 8%, #FDEBD2 0%, #F7D9BE 42%, #EFC4AD 78%, #E9B7A4 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 30% at 50% 14%, rgba(255,236,196,0.9), transparent 70%)",
        }}
      />

      {/* full-screen video (revealed on play) */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: phase === "playing" ? 1 : 0 }}
        src={siteConfig.intro.video}
        poster={siteConfig.intro.poster}
        playsInline
        preload="auto"
        onEnded={finish}
        disablePictureInPicture
      />

      {/* envelope + wordmark + cue */}
      <div
        className="relative z-10 flex animate-fade-up flex-col items-center transition-opacity duration-700"
        style={{
          opacity: showEnvelope ? 1 : 0,
          pointerEvents: showEnvelope ? "auto" : "none",
        }}
      >
        <div style={{ perspective: 1400 }}>
          <div className={phase === "closed" ? "float-soft" : ""}>
            <Envelope open={phase !== "closed"} width={380} />
          </div>
        </div>

        {/* wordmark */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="gold-shimmer font-serif text-2xl uppercase tracking-[0.4em] sm:text-3xl">
            {siteConfig.couple.groom.firstName} &amp; {siteConfig.couple.bride.firstName}
          </p>
          <div className="flex items-center gap-3 text-gold/70">
            <span className="h-px w-10 bg-gold/50" />
            <span aria-hidden>✦</span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-ink-soft">
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
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card/70 px-5 py-2 font-serif text-sm uppercase tracking-[0.3em] text-rust shadow-soft backdrop-blur transition hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rust/50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rust" />
            </span>
            {playFailed ? "Tap to enter" : siteConfig.intro.openLabel}
          </button>
        )}
      </div>
    </div>
  );
}
