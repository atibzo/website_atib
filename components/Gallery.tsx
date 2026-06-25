"use client";

import { useRef } from "react";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";

const { gallery } = siteConfig;

/**
 * "Our Beautiful Moments" — a horizontal, scroll-snapping carousel of portrait
 * media cards with prev/next controls. Works as a plain scroll area on touch.
 */
export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8 * dir;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      id="moments"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center"
    >
      <Reveal>
        <p className="eyebrow">{gallery.eyebrow}</p>
        <h2 className="heading-script mx-auto mt-4 max-w-3xl">{gallery.heading}</h2>
        <p className="divider-star mt-5 text-gold">✦</p>
      </Reveal>

      <Reveal delay={120} className="mt-12 w-full max-w-5xl">
        <div className="relative">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gallery.media.map((m, i) => (
              <figure
                key={i}
                className="relative aspect-[3/4] w-[72vw] max-w-[320px] flex-none snap-center overflow-hidden rounded-2xl bg-card shadow-card sm:w-[320px]"
              >
                <Media media={m} priority={i === 0} />
              </figure>
            ))}
          </div>

          {/* controls */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous moment"
            className="absolute -left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card text-rust shadow-soft transition hover:bg-cream-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:flex"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next moment"
            className="absolute -right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card text-rust shadow-soft transition hover:bg-cream-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:flex"
          >
            <Chevron dir="right" />
          </button>
        </div>
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
