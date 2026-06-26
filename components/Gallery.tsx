"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";

const { gallery } = siteConfig;

/**
 * "Our Beautiful Moments" — a centre-focused carousel. The landscape highlight
 * (family photo) sits centered and in focus, with the two portrait photos
 * peeking on either side. Swipe horizontally on touch; chevrons on ≥sm. The
 * highlight is scrolled to centre on mount. Works on mobile and desktop (no
 * vertical stacking).
 */
export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLElement>(null);

  const center = (smooth = false) => {
    const track = trackRef.current;
    const hi = highlightRef.current;
    if (!track || !hi) return;
    const left = hi.offsetLeft - (track.clientWidth - hi.offsetWidth) / 2;
    track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => center(false));
    const onResize = () => center(false);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section
      id="moments"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-0 py-24 text-center"
    >
      <Reveal>
        <p className="eyebrow">{gallery.eyebrow}</p>
        <h2 className="heading-script mx-auto mt-4 max-w-3xl">{gallery.heading}</h2>
        <p className="divider-star mt-5 text-gold">✦</p>
      </Reveal>

      <Reveal delay={120} className="relative mt-12 w-full">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-smooth px-[18vw] py-2 sm:gap-7 sm:px-[calc(50vw-300px)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {gallery.media.map((m, i) =>
            m.landscape ? (
              <figure
                key={i}
                ref={highlightRef}
                className="relative aspect-[3/2] w-[82vw] max-w-[560px] flex-none snap-center overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-gold/40 sm:w-[520px]"
              >
                <Media media={m} priority />
              </figure>
            ) : (
              <figure
                key={i}
                className="relative aspect-[3/4] w-[52vw] max-w-[220px] flex-none snap-center overflow-hidden rounded-2xl bg-card opacity-90 shadow-soft ring-1 ring-gold/25 sm:w-[220px]"
              >
                <Media media={m} />
              </figure>
            )
          )}
        </div>

        {/* controls (desktop) */}
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card text-coral shadow-soft transition hover:bg-cream-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-teal sm:flex"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card text-coral shadow-soft transition hover:bg-cream-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-teal sm:flex"
        >
          <Chevron dir="right" />
        </button>
      </Reveal>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
