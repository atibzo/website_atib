/**
 * Bespoke layered-SVG scene illustrations for the event cards, themed to the
 * "Sunset Coral & Teal" palette with beachy + festive motifs:
 *   - haldi   : sunny daytime, marigold garland, turmeric, palms
 *   - sangeet : dusk, string fairy-lights, stage, bokeh
 *   - nikah   : beach lawn, floral arch, sea, sky, crescent
 *
 * Scene-only (no text — the card UI supplies the name/date). Vector, so they
 * stay crisp; swap an event's `media` in config to use a real photo instead.
 */

export type SceneVariant = "haldi" | "sangeet" | "nikah";

/** Text colour tone for overlays drawn on top of each scene. */
export const sceneTone: Record<SceneVariant, "light" | "dark"> = {
  haldi: "dark",
  sangeet: "light",
  nikah: "dark",
};

/** A stylised couple silhouette (groom + bride in a gown). */
function Couple({ x, y, s = 1, fill = "#2B2230" }: {
  x: number; y: number; s?: number; fill?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      {/* groom */}
      <circle cx="-18" cy="-58" r="9" />
      <path d="M-27 -50 q9 -6 18 0 l3 50 -24 0 Z" />
      <rect x="-25" y="0" width="14" height="34" rx="2" />
      <rect x="-11" y="0" width="6" height="34" rx="2" />
      {/* bride (gown) */}
      <circle cx="16" cy="-56" r="8" />
      <path d="M16 -49 q3 0 4 3 l14 79 -36 0 14 -79 q1 -3 4 -3 Z" />
      {/* veil */}
      <path d="M8 -58 q-8 26 -6 60" stroke={fill} strokeWidth="1.5" fill="none" opacity="0.5" />
    </g>
  );
}

export default function EventScene({ variant }: { variant: SceneVariant }) {
  return (
    <svg
      viewBox="0 0 400 533"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${variant} illustration`}
    >
      {variant === "haldi" && <Haldi />}
      {variant === "sangeet" && <Sangeet />}
      {variant === "nikah" && <Nikah />}
    </svg>
  );
}

/* ── shared bits ─────────────────────────────────────────────────────────── */

function Palm({ x, y, s = 1, flip = false, fill = "#3C6B5D" }: {
  x: number; y: number; s?: number; flip?: boolean; fill?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -s : s)} ${s})`} fill={fill}>
      <path d="M0 0 C -3 -40 -2 -80 4 -120 L 9 -120 C 6 -80 6 -40 7 0 Z" />
      {/* fronds */}
      <path d="M5 -120 C -28 -132 -52 -120 -64 -100 C -40 -108 -16 -110 5 -118 Z" />
      <path d="M5 -120 C 28 -134 54 -122 66 -102 C 42 -110 18 -112 5 -118 Z" />
      <path d="M5 -120 C -22 -150 -20 -176 -6 -196 C -8 -168 0 -144 8 -122 Z" />
      <path d="M5 -120 C 30 -150 30 -176 18 -198 C 20 -168 14 -144 7 -122 Z" />
      <path d="M5 -120 C -44 -126 -66 -110 -74 -88 C -52 -100 -28 -108 5 -116 Z" opacity="0.85" />
    </g>
  );
}

function Marigold({ x, y, r = 9, c = "#F0A93B", c2 = "#E0792A" }: {
  x: number; y: number; r?: number; c?: string; c2?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={0} cy={-r} r={r * 0.42} fill={c}
          transform={`rotate(${i * 30})`} />
      ))}
      <circle r={r * 0.6} fill={c2} />
    </g>
  );
}

/* ── HALDI — sunny, marigold, turmeric ───────────────────────────────────── */

function Haldi() {
  return (
    <>
      <defs>
        <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCEBC2" />
          <stop offset="55%" stopColor="#F8D89A" />
          <stop offset="100%" stopColor="#F2C088" />
        </linearGradient>
        <linearGradient id="h-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3FA7A0" />
          <stop offset="100%" stopColor="#79C8BF" />
        </linearGradient>
      </defs>
      <rect width="400" height="533" fill="url(#h-sky)" />
      {/* sun */}
      <circle cx="300" cy="120" r="46" fill="#FBE7A6" opacity="0.85" />
      <circle cx="300" cy="120" r="30" fill="#F8D77A" />
      {/* palms (behind the pool) */}
      <Palm x={64} y={430} s={1.1} fill="#4A7A63" />
      <Palm x={356} y={438} s={1.3} flip fill="#3C6B5D" />
      {/* poolside deck */}
      <rect y="356" width="400" height="177" fill="#E9D6B4" />
      <rect y="356" width="400" height="9" fill="#D8C098" opacity="0.6" />
      {/* swimming pool with tiled rim */}
      <rect x="34" y="372" width="332" height="92" rx="14" fill="#CFE7DF" />
      <rect x="40" y="378" width="320" height="80" rx="10" fill="url(#h-pool)" />
      {/* ripples */}
      <g stroke="#EAF6F1" strokeWidth="2" opacity="0.6" strokeLinecap="round" fill="none">
        <path d="M64 404 q 16 -6 32 0 t 32 0" />
        <path d="M214 420 q 16 -6 32 0 t 32 0" />
        <path d="M120 440 q 16 -6 32 0 t 32 0" />
      </g>
      {/* marigold petals floating on the water */}
      <Marigold x={92} y={410} r={6} c="#F0A93B" />
      <Marigold x={300} y={398} r={6} c="#E68A2E" />
      <Marigold x={250} y={440} r={5} c="#F0A93B" />
      {/* marigold garland (toran) */}
      <path d="M0 64 Q 200 130 400 64" fill="none" stroke="#5C8A4A" strokeWidth="3" />
      {Array.from({ length: 13 }).map((_, i) => {
        const t = i / 12;
        const x = t * 400;
        const y = 64 + 66 * Math.sin(Math.PI * t);
        return <line key={i} x1={x} y1={y} x2={x} y2={y + 16} stroke="#5C8A4A" strokeWidth="1.6" />;
      })}
      {Array.from({ length: 13 }).map((_, i) => {
        const t = i / 12;
        const x = t * 400;
        const y = 64 + 66 * Math.sin(Math.PI * t) + 20;
        return <Marigold key={i} x={x} y={y} r={9} c={i % 2 ? "#F0A93B" : "#E68A2E"} />;
      })}
      {/* extra hanging marigold strands */}
      {[120, 200, 280].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="86" x2={x} y2="180" stroke="#5C8A4A" strokeWidth="1.4" />
          {[0, 1, 2, 3].map((k) => (
            <Marigold key={k} x={x} y={104 + k * 24} r={6} c={k % 2 ? "#E68A2E" : "#F0A93B"} />
          ))}
        </g>
      ))}
      {/* low decorated platform + seated couple */}
      <ellipse cx="200" cy="508" rx="96" ry="14" fill="#C9A86F" opacity="0.45" />
      <rect x="120" y="486" width="160" height="20" rx="5" fill="#C58B4A" />
      <rect x="120" y="486" width="160" height="6" fill="#E8A93B" />
      <Couple x={200} y={486} s={0.82} fill="#6B4429" />
      {/* turmeric bowl */}
      <ellipse cx="300" cy="470" rx="26" ry="8" fill="#E8A93B" />
      <ellipse cx="300" cy="467" rx="20" ry="6" fill="#F4C24A" />
    </>
  );
}

/* ── SANGEET — dusk, fairy-lights, stage ─────────────────────────────────── */

function Sangeet() {
  return (
    <>
      <defs>
        <linearGradient id="s-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#274A66" />
          <stop offset="45%" stopColor="#6B4A78" />
          <stop offset="78%" stopColor="#C76A5C" />
          <stop offset="100%" stopColor="#E89A6A" />
        </linearGradient>
      </defs>
      <rect width="400" height="533" fill="url(#s-sky)" />
      {/* moon */}
      <circle cx="312" cy="96" r="30" fill="#FBE9C4" opacity="0.9" />
      {/* bokeh */}
      {[[60, 150, 5], [120, 90, 3], [250, 60, 4], [340, 200, 5], [40, 250, 3], [360, 300, 4], [180, 140, 3]].map(
        ([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#FCE6B0" opacity="0.6" />
      )}
      {/* sea reflection */}
      <rect y="430" width="400" height="103" fill="#3A4E63" />
      <rect y="430" width="400" height="103" fill="url(#s-sky)" opacity="0.25" />
      {[440, 470, 500].map((y, i) => (
        <line key={i} x1="120" y1={y} x2="280" y2={y} stroke="#F2C98A" strokeWidth="2" opacity="0.4" />
      ))}
      {/* palms silhouette */}
      <Palm x={48} y={440} s={1.2} fill="#1E2E3A" />
      <Palm x={360} y={448} s={1.4} flip fill="#1E2E3A" />
      {/* fairy-light strings */}
      {[40, 96].map((base, row) => (
        <g key={row}>
          <path d={`M0 ${base} Q 200 ${base + 46} 400 ${base}`} fill="none" stroke="#caa86b" strokeWidth="1.4" opacity="0.7" />
          {Array.from({ length: 17 }).map((_, i) => {
            const t = i / 16;
            const x = t * 400;
            const y = base + 46 * Math.sin(Math.PI * t);
            return <circle key={i} cx={x} cy={y + 6} r="2.6" fill="#FFE9A8" />;
          })}
        </g>
      ))}
      {/* disco balls */}
      {[[96, 150], [304, 138]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1="0" x2={cx} y2={cy - 12} stroke="#caa86b" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="12" fill="#9FB6C4" />
          <g stroke="#E8F0F4" strokeWidth="0.7" opacity="0.7">
            <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} />
            <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} />
            <line x1={cx - 9} y1={cy - 8} x2={cx + 9} y2={cy + 8} />
            <line x1={cx - 9} y1={cy + 8} x2={cx + 9} y2={cy - 8} />
          </g>
        </g>
      ))}
      {/* stage */}
      <rect x="116" y="366" width="168" height="98" rx="6" fill="#5A3A52" />
      <rect x="116" y="366" width="168" height="16" fill="#7A4A66" />
      {/* drapes */}
      {[134, 170, 230, 266].map((x, i) => (
        <path key={i} d={`M${x} 382 q 8 40 0 82`} stroke="#C97A8E" strokeWidth="9" fill="none" opacity="0.75" strokeLinecap="round" />
      ))}
      {/* dancing couple on stage */}
      <Couple x={200} y={372} s={0.74} fill="#F2D9A6" />
      {/* music notes */}
      <g fill="#FCE6B0" opacity="0.85">
        <circle cx="150" cy="250" r="5" /><rect x="154" y="226" width="2.5" height="26" />
        <circle cx="262" cy="220" r="5" /><rect x="266" y="196" width="2.5" height="26" />
      </g>
    </>
  );
}

/* ── NIKAH — beach lawn, floral arch, sea ────────────────────────────────── */

function Nikah() {
  return (
    <>
      <defs>
        <linearGradient id="n-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CDE7EA" />
          <stop offset="55%" stopColor="#EAD9D0" />
          <stop offset="100%" stopColor="#F5E3CE" />
        </linearGradient>
        <linearGradient id="n-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E9AA0" />
          <stop offset="100%" stopColor="#79C0BE" />
        </linearGradient>
      </defs>
      <rect width="400" height="533" fill="url(#n-sky)" />
      {/* crescent */}
      <path d="M330 86 a26 26 0 1 1 -9 -20 a20 20 0 1 0 0 40 a26 26 0 0 1 9 -20Z" fill="#E8C56A" opacity="0.85" />
      {/* sea + foam + sand */}
      <rect y="300" width="400" height="92" fill="url(#n-sea)" />
      <path d="M0 388 Q 200 372 400 388 L400 400 L0 400 Z" fill="#EAF3EF" opacity="0.8" />
      <path d="M0 392 Q 200 376 400 392 L400 533 L0 533 Z" fill="#EFD9B4" />
      <path d="M0 452 Q 200 436 400 452 L400 533 L0 533 Z" fill="#E6CBA0" />
      {/* palms */}
      <Palm x={52} y={392} s={1.2} fill="#4A7A63" />
      <Palm x={362} y={400} s={1.35} flip fill="#3C6B5D" />
      {/* floral arch */}
      <g>
        <path d="M120 470 L120 300 Q 200 250 280 300 L280 470" fill="none" stroke="#F4ECE0" strokeWidth="9" strokeLinecap="round" />
        {/* flowers along the arch */}
        {Array.from({ length: 16 }).map((_, i) => {
          const t = i / 15;
          // parametric along the two posts + curved top
          let x, y;
          if (t < 0.32) { x = 120; y = 470 - (470 - 300) * (t / 0.32); }
          else if (t > 0.68) { const u = (t - 0.68) / 0.32; x = 280; y = 300 + (470 - 300) * u; }
          else { const u = (t - 0.32) / 0.36; x = 120 + 160 * u; y = 300 - 50 * Math.sin(Math.PI * u); }
          const col = i % 3 === 0 ? "#E0654B" : i % 3 === 1 ? "#F0A93B" : "#F4ECE0";
          return <circle key={i} cx={x} cy={y} r="7" fill={col} />;
        })}
        {/* greenery */}
        {Array.from({ length: 10 }).map((_, i) => {
          const u = i / 9; const x = 120 + 160 * u; const y = 300 - 50 * Math.sin(Math.PI * u);
          return <circle key={i} cx={x} cy={y + 8} r="4" fill="#6FA07E" opacity="0.8" />;
        })}
      </g>
      {/* aisle */}
      <path d="M168 533 L186 470 L214 470 L232 533 Z" fill="#F4ECE0" opacity="0.6" />
      {/* couple under the arch */}
      <Couple x={200} y={470} s={0.82} fill="#5A4636" />
    </>
  );
}
