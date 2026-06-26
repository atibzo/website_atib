import Monogram from "@/components/decor/Monogram";
import { Frangipani, PalmFrond } from "@/components/decor/Florals";

/**
 * "Goa Sunset" envelope — layered SVG + CSS with a real 3D flap that opens.
 * Sand→blush textured paper, gold hairline border, four pocket seams meeting
 * at center, frangipani + palm corner sprigs, and the A&S monogram as the seal.
 *
 * `open` drives the flap (rotates up/back) and lifts the seal away.
 */
export default function Envelope({
  open = false,
  width = 380,
}: {
  open?: boolean;
  width?: number;
}) {
  const height = Math.round(width * 0.72);
  const flapPct = 58.3; // apex at 168/288

  return (
    <div
      className="relative drop-shadow-[0_30px_50px_rgba(150,90,55,0.28)]"
      style={{ width, height, transformStyle: "preserve-3d" }}
    >
      {/* ── envelope body (paper, seams, border) ── */}
      <svg
        viewBox="0 0 400 288"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8E6CC" />
            <stop offset="55%" stopColor="#F3D4BA" />
            <stop offset="100%" stopColor="#EBBBA6" />
          </linearGradient>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
            <feColorMatrix in="n" type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
          </filter>
        </defs>

        <rect x="2" y="2" width="396" height="284" rx="12" fill="url(#paper)" />
        {/* subtle paper grain */}
        <rect x="2" y="2" width="396" height="284" rx="12" filter="url(#grain)" opacity="0.06" />
        {/* pocket seams to center */}
        <g stroke="#C98E63" strokeWidth="1" opacity="0.55">
          <path d="M2 286 L200 168" />
          <path d="M398 286 L200 168" />
          <path d="M2 2 L200 168" opacity="0.3" />
          <path d="M398 2 L200 168" opacity="0.3" />
        </g>
        {/* gold hairline double border */}
        <rect x="2" y="2" width="396" height="284" rx="12" stroke="#7E5E1C" strokeWidth="1.6" />
        <rect x="9" y="9" width="382" height="270" rx="9" stroke="#A8852F" strokeWidth="0.7" opacity="0.7" />
      </svg>

      {/* ── corner botanicals ── */}
      <PalmFrond size={width * 0.28} className="absolute -left-4 -top-5 opacity-80" />
      <Frangipani size={width * 0.15} className="absolute -left-2 top-8" />
      <PalmFrond size={width * 0.28} flip className="absolute -bottom-5 -right-4 rotate-180 opacity-80" />
      <Frangipani size={width * 0.13} className="absolute -right-1 bottom-7" />

      {/* ── top flap (opens) ── */}
      <div
        className="absolute left-0 top-0 w-full origin-top transition-transform duration-[1100ms] ease-[cubic-bezier(.22,.61,.36,1)]"
        style={{
          height: `${flapPct}%`,
          transform: open ? "rotateX(-162deg)" : "rotateX(0deg)",
          transformStyle: "preserve-3d",
          zIndex: open ? 5 : 20,
        }}
      >
        <svg viewBox="0 0 400 168" className="h-full w-full" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="flap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F9E9D2" />
              <stop offset="100%" stopColor="#F1CDB0" />
            </linearGradient>
          </defs>
          <polygon points="2,2 398,2 200,166" fill="url(#flap)" stroke="#7E5E1C" strokeWidth="1.6" />
          <polygon points="12,6 388,6 200,156" fill="none" stroke="#A8852F" strokeWidth="0.7" opacity="0.7" />
        </svg>
      </div>

      {/* ── monogram seal ── */}
      <div
        className="absolute left-1/2 z-30 -translate-x-1/2 transition-all duration-700 ease-out"
        style={{
          top: `${flapPct}%`,
          transform: `translate(-50%, -50%) ${open ? "translateY(-40px) scale(0.6)" : "scale(1)"}`,
          opacity: open ? 0 : 1,
        }}
      >
        <Monogram size={width * 0.36} />
      </div>
    </div>
  );
}
