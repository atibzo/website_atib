import Image from "next/image";

/**
 * Watercolour floral border across the top of the page (mirrored on both
 * sides). Swap `public/decor/floral-border.svg` with the couple's artwork —
 * a wide PNG/SVG works best.
 */
export default function FloralBorder() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[4] flex justify-between"
    >
      <Image
        src="/decor/floral-border.svg"
        alt=""
        width={420}
        height={260}
        priority
        className="h-auto w-40 opacity-90 sm:w-64 md:w-80"
      />
      <Image
        src="/decor/floral-border.svg"
        alt=""
        width={420}
        height={260}
        priority
        className="h-auto w-40 -scale-x-100 opacity-90 sm:w-64 md:w-80"
      />
    </div>
  );
}
