"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Scroll-scrubbed video intro. The site opens on a "closed letter" video; as
 * the guest scrolls (or drags on touch), the video is scrubbed open frame by
 * frame, then hands off to the invitation below.
 *
 * Mechanics: a tall wrapper (`scrollVh` high) pins a full-viewport <video>.
 * The wrapper's scroll progress (0→1) maps to `video.currentTime`. We never
 * call play(); we drive currentTime directly, eased via requestAnimationFrame
 * for a smooth unfold even when scroll events arrive in bursts.
 *
 * Fallbacks: under prefers-reduced-motion, or if metadata never loads, the
 * section collapses to one screen and simply plays the clip once (muted),
 * so the page is always usable.
 */
export default function IntroLetter({ scrollVh = 320 }: { scrollVh?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    if (reduced) {
      // Calm fallback: just let it play through once.
      video.muted = true;
      video.play().catch(() => {});
      return;
    }

    let duration = 0;
    let target = 0; // desired currentTime from scroll
    let shown = 0; // eased currentTime actually applied
    let raf = 0;
    let pendingProgress = 0;

    const onMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const computeProgress = () => {
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const p = -rect.top / scrollable;
      return Math.min(1, Math.max(0, p));
    };

    const loop = () => {
      target = pendingProgress * duration;
      // Ease the applied time toward the scroll target.
      shown += (target - shown) * 0.12;
      if (duration > 0 && Math.abs(target - shown) > 0.005) {
        try {
          video.currentTime = shown;
        } catch {
          /* seeking may briefly throw mid-load; ignore */
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      pendingProgress = computeProgress();
      setProgress(pendingProgress);
    };

    onScroll();
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [reduced]);

  // Hint fades out as the letter opens.
  const hintOpacity = Math.max(0, 1 - progress * 2.2);

  return (
    <section
      ref={wrapRef}
      aria-label="Wedding invitation — scroll to open"
      className="relative z-10"
      style={{ height: reduced ? "100svh" : `${scrollVh}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={siteConfig.intro.video}
          poster={siteConfig.intro.poster}
          muted
          playsInline
          preload="auto"
          // Keep last-frame visible when scrubbed to the end.
          disablePictureInPicture
        />

        {/* gentle vignette so overlay text is legible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/40" />

        {/* scroll-to-open hint */}
        <div
          className="pointer-events-none absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
          style={{ opacity: hintOpacity, transition: "opacity 0.2s linear" }}
        >
          <span className="eyebrow text-rust">Scroll to open</span>
          <svg
            className="animate-bounce-soft text-rust"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* accessible skip */}
        <a
          href="#invitation"
          className="absolute right-5 top-5 rounded-full bg-card/80 px-4 py-1.5 font-serif text-sm tracking-wide text-rust shadow-soft backdrop-blur transition hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Skip intro
        </a>
      </div>
    </section>
  );
}
