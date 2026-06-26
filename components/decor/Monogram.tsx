import { siteConfig } from "@/config/site";
import { Frangipani } from "@/components/decor/Florals";

/**
 * Reusable gold "A & S" monogram crest. Initials derive from the couple's
 * first names. A thin double-ring frames the script initials, with small
 * frangipani accents; a slow diagonal gold shimmer sweeps the letters.
 */
export default function Monogram({
  size = 132,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const g = siteConfig.couple.groom.firstName.charAt(0).toUpperCase();
  const b = siteConfig.couple.bride.firstName.charAt(0).toUpperCase();

  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${g} and ${b} monogram`}
    >
      {/* rings + dots */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="47" stroke="#B8923C" strokeWidth="0.8" opacity="0.9" />
        <circle cx="50" cy="50" r="43" stroke="#CDA85B" strokeWidth="0.5" opacity="0.7" />
        {/* four cardinal dots */}
        {[0, 90, 180, 270].map((deg) => (
          <circle
            key={deg}
            cx="50"
            cy="3.5"
            r="1.3"
            fill="#B8923C"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </svg>

      {/* frangipani accents top & bottom */}
      <Frangipani size={size * 0.2} className="absolute -top-1 left-1/2 -translate-x-1/2" />

      {/* initials — serif caps for legibility, script ampersand */}
      <div className="gold-shimmer flex items-center leading-none">
        <span className="font-serif font-medium" style={{ fontSize: size * 0.34 }}>
          {g}
        </span>
        <span
          className="font-script"
          style={{ fontSize: size * 0.26, margin: `0 ${size * 0.02}px` }}
        >
          &amp;
        </span>
        <span className="font-serif font-medium" style={{ fontSize: size * 0.34 }}>
          {b}
        </span>
      </div>
    </div>
  );
}
