"use client";

import { useEffect, useState } from "react";

type Petal = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
  rounded: string;
};

const COLORS = ["#E8B9A0", "#D98C6A", "#E7C97E", "#CDA85B", "#E2A38A"];

/**
 * Soft petals/confetti drifting down the whole page. Generated on the client
 * (randomised) so it never causes SSR hydration mismatches. Hidden entirely
 * under `prefers-reduced-motion` (see globals.css).
 */
export default function Petals({ count = 26 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const items: Petal[] = Array.from({ length: count }, () => {
      const size = 6 + Math.random() * 10;
      return {
        left: Math.random() * 100,
        size,
        delay: -Math.random() * 16,
        duration: 12 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 220,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        // Petal-ish ellipse: one corner rounded asymmetrically.
        rounded: `${50 + Math.random() * 30}% ${20 + Math.random() * 30}%`,
      };
    });
    setPetals(items);
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.6}px`,
            background: p.color,
            borderRadius: `${p.rounded} ${p.rounded}`,
            opacity: 0,
            // @ts-expect-error custom property consumed by the keyframe
            "--drift": `${p.drift}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
