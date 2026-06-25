/**
 * Thin gold corner brackets framing the viewport, matching the reference
 * invitation. Purely decorative, fixed above the page content.
 */
export default function CornerFrame() {
  const base =
    "pointer-events-none fixed z-[6] h-16 w-16 border-gold/60 sm:h-24 sm:w-24";
  return (
    <div aria-hidden="true">
      <span className={`${base} left-4 top-4 border-l border-t sm:left-7 sm:top-7`} />
      <span className={`${base} right-4 top-4 border-r border-t sm:right-7 sm:top-7`} />
      <span
        className={`${base} bottom-4 left-4 border-b border-l sm:bottom-7 sm:left-7`}
      />
      <span
        className={`${base} bottom-4 right-4 border-b border-r sm:bottom-7 sm:right-7`}
      />
    </div>
  );
}
