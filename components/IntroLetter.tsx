"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

type Phase = "closed" | "opening";

/**
 * Tap-to-open letter intro. Shows the closed letter as a full-screen overlay;
 * on tap the video plays the unfold (with its own audio), then the overlay
 * dissolves to reveal the invitation underneath.
 *
 * Why not scroll-scrubbing: driving video.currentTime from scroll is janky to
 * frozen on non-faststart / sparse-keyframe MP4s (and throttled on mobile).
 * Playing the clip is reliable everywhere.
 *
 * The page's first real section (#invitation) sits at scroll-top behind this
 * overlay, so dismissal is a true cross-fade. Scroll is locked while open.
 */
export default function IntroLetter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [closing, setClosing] = useState(false); // fading out
  const [dismissed, setDismissed] = useState(false); // unmounted
  // Becomes true if autoplay/codec fails — cue switches to "tap to enter".
  const [playFailed, setPlayFailed] = useState(false);

  // Reduced motion: skip the whole thing immediately.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDismissed(true);
    }
  }, []);

  // Lock body scroll while the overlay is visible.
  useEffect(() => {
    if (dismissed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dismissed]);

  // Escape key skips (accessible, no visible button).
  useEffect(() => {
    if (dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed]);

  // Fade out, then unmount after the transition.
  const finish = () => {
    setClosing(true);
    window.setTimeout(() => setDismissed(true), 750);
  };

  const open = async () => {
    if (phase !== "closed") return;
    const video = videoRef.current;
    if (!video) return finish();
    setPhase("opening");
    try {
      video.muted = false;
      await video.play();
    } catch {
      // Autoplay blocked or codec unsupported — let the guest dissolve in.
      setPlayFailed(true);
    }
  };

  // Tapping the overlay: open when closed, skip to end when playing.
  const onOverlayClick = () => {
    if (phase === "closed") open();
    else finish();
  };

  if (dismissed) return null;

  return (
    <div
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-cream transition-opacity duration-700"
      style={{ opacity: closing ? 0 : 1, pointerEvents: closing ? "none" : "auto" }}
      role="dialog"
      aria-label="Wedding invitation"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={siteConfig.intro.video}
        poster={siteConfig.intro.poster}
        playsInline
        preload="auto"
        onEnded={finish}
        disablePictureInPicture
      />

      {/* soft wash for cue legibility (closed state only) */}
      {phase === "closed" && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream/50" />
      )}

      {/* tap-to-open cue — the only chrome */}
      {phase === "closed" && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          aria-label={`${siteConfig.intro.openLabel} — open the invitation`}
          className="group absolute bottom-[12%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 focus:outline-none"
        >
          <span className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-rust/30" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rust text-cream shadow-soft transition group-hover:scale-105">
              <WaxSealMark />
            </span>
          </span>
          <span className="eyebrow text-rust">
            {playFailed ? "Tap to enter" : siteConfig.intro.openLabel}
          </span>
        </button>
      )}
    </div>
  );
}

function WaxSealMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* crescent + star, echoing the invitation emblem */}
      <path
        d="M15.5 12a4.2 4.2 0 1 1-1.6-3.3 3.2 3.2 0 1 0 0 6.6A4.2 4.2 0 0 1 15.5 12Z"
        fill="currentColor"
      />
      <path
        d="M17.6 9.2l.5 1.1 1.2.15-.9.82.22 1.18-1.04-.56-1.05.56.22-1.18-.9-.82 1.2-.15z"
        fill="currentColor"
      />
    </svg>
  );
}
