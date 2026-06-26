import type { WeddingEvent } from "@/config/site";
import EventScene, { sceneTone, type SceneVariant } from "@/components/decor/EventScene";
import Media from "@/components/Media";

/**
 * A self-contained "invitation card": the illustrated scene fills the card and
 * the event name / date / time are composed on top with real fonts (gold inner
 * frame + corner flourishes), mirroring a printed invite. If the event has a
 * real `media` image/video it is used instead of the illustration.
 */
export default function EventCard({ event }: { event: WeddingEvent }) {
  const variant = (event.illustration ?? "nikah") as SceneVariant;
  const tone = event.media ? "dark" : sceneTone[variant];
  const light = tone === "light";

  const textShadow = light
    ? "0 1px 12px rgba(20,16,30,0.55)"
    : "0 1px 10px rgba(255,250,240,0.6)";
  const nameColor = light ? "#FCE7C2" : "#BC4B30";
  const subColor = light ? "rgba(255,250,240,0.92)" : "#4E443C";
  const ruleColor = light ? "rgba(252,231,194,0.7)" : "rgba(184,146,60,0.8)";

  return (
    <figure className="relative mx-auto aspect-[3/4] w-[80vw] max-w-[360px] overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-gold/40">
      {/* scene / photo */}
      <div className="absolute inset-0">
        {event.media ? <Media media={event.media} /> : <EventScene variant={variant} />}
      </div>

      {/* legibility scrims top + bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: light
            ? "linear-gradient(to bottom, rgba(20,16,30,0.45) 0%, transparent 32%, transparent 55%, rgba(20,16,30,0.62) 100%)"
            : "linear-gradient(to bottom, rgba(255,248,236,0.55) 0%, transparent 30%, transparent 52%, rgba(255,248,236,0.72) 100%)",
        }}
      />

      {/* gold inner frame + corner flourishes */}
      <div className="pointer-events-none absolute inset-3 rounded-xl border border-gold/70" />
      <span aria-hidden className="pointer-events-none absolute inset-0">
        {[
          "left-2 top-2 border-l border-t",
          "right-2 top-2 border-r border-t",
          "bottom-2 left-2 border-b border-l",
          "bottom-2 right-2 border-b border-r",
        ].map((c, i) => (
          <span key={i} className={`absolute h-5 w-5 border-gold ${c}`} />
        ))}
      </span>

      {/* text overlay */}
      <figcaption className="absolute inset-0 flex flex-col items-center justify-between px-6 py-8 text-center">
        <div className="flex flex-col items-center gap-1">
          <span aria-hidden style={{ color: ruleColor }} className="text-lg">
            ✦
          </span>
          <h3
            className="font-display text-4xl italic sm:text-5xl"
            style={{ color: nameColor, textShadow }}
          >
            {event.name}
          </h3>
        </div>

        <div className="flex flex-col items-center gap-2" style={{ color: subColor, textShadow }}>
          <div className="flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.3em]">
            <span className="h-px w-6" style={{ background: ruleColor }} />
            {event.dayName}
            <span className="h-px w-6" style={{ background: ruleColor }} />
          </div>
          <div className="flex items-end gap-3 font-display leading-none">
            <span className="text-2xl italic">{event.month}</span>
            <span className="text-6xl" style={{ color: nameColor }}>{event.dateNum}</span>
            <span className="text-2xl italic">{event.year}</span>
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.3em]">{event.time}</p>
        </div>
      </figcaption>
    </figure>
  );
}
