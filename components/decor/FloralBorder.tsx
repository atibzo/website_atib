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
        width={560}
        height={360}
        priority
        className="h-auto w-1/2 max-w-[420px]"
      />
      <Image
        src="/decor/floral-border.svg"
        alt=""
        width={560}
        height={360}
        priority
        className="h-auto w-1/2 max-w-[420px] -scale-x-100"
      />
    </div>
  );
}
