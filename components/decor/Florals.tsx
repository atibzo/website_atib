/**
 * Hand-built botanical SVGs for the "Goa Sunset" theme — frangipani (plumeria)
 * blossoms and palm fronds. Purely decorative, color-tunable via props.
 */

export function Frangipani({
  size = 64,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  // 5 pinwheel petals around a warm center.
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fg-petal" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="55%" stopColor="#FCEFD9" />
          <stop offset="100%" stopColor="#F3CBA7" />
        </radialGradient>
        <radialGradient id="fg-core" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#F6D173" />
          <stop offset="100%" stopColor="#E7A85C" />
        </radialGradient>
      </defs>
      <g>
        {petals.map((deg) => (
          <ellipse
            key={deg}
            cx="50"
            cy="30"
            rx="15"
            ry="24"
            fill="url(#fg-petal)"
            stroke="#EBB68C"
            strokeWidth="0.6"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="9" fill="url(#fg-core)" />
      </g>
    </svg>
  );
}

export function PalmFrond({
  size = 120,
  className = "",
  flip = false,
}: {
  size?: number;
  className?: string;
  flip?: boolean;
}) {
  // A gently curved stem with leaflets along both sides.
  const leaflets = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M14 110 C40 80 64 52 104 16"
        stroke="#9FAE84"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {leaflets.map((i) => {
        const t = i / (leaflets.length - 1);
        const x = 14 + (104 - 14) * t;
        const y = 110 - (110 - 16) * t;
        const len = 13 + 9 * Math.sin(Math.PI * t);
        // graceful single curved leaflet, alternating sides
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <path
            key={i}
            d={`M${x} ${y} q ${side * len * 0.4} ${-len * 0.5} ${side * len * 0.2} ${-len}`}
            stroke="#A8B78C"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
    </svg>
  );
}
