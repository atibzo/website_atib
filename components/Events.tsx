import { siteConfig, type WeddingEvent } from "@/config/site";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import EventScene from "@/components/decor/EventScene";

const { events } = siteConfig;

/**
 * "Sacred Ceremonies" — one block per event: date label, brush-script name, a
 * vertical invitation media card, day/date/time, venue (with map link).
 */
export default function Events() {
  return (
    <section
      id="ceremonies"
      className="relative z-10 flex min-h-screen flex-col items-center px-4 py-24 text-center"
    >
      <Reveal>
        <p className="eyebrow">{events.eyebrow}</p>
        <h2 className="heading-script mx-auto mt-4 max-w-3xl">{events.heading}</h2>
        <p className="divider-star mt-5 text-gold">✦</p>
      </Reveal>

      <div className="mt-14 flex w-full max-w-5xl flex-col gap-20">
        {events.list.map((event, i) => (
          <EventBlock key={i} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}

function EventBlock({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <Reveal>
      <div className="flex flex-col items-center">
        <p className="eyebrow text-ink-soft">{event.dateLabel}</p>
        <h3 className="mt-2 font-display italic text-4xl text-coral sm:text-5xl">
          {event.name}
        </h3>

        {(event.media || event.illustration) && (
          <figure className="relative mx-auto mt-8 aspect-[3/4] w-[78vw] max-w-[340px] overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-gold/30">
            {event.media ? (
              <Media media={event.media} priority={index === 0} />
            ) : (
              <EventScene variant={event.illustration!} />
            )}
          </figure>
        )}

        {/* date strip */}
        <div className="mt-8 flex items-center justify-center gap-4 font-serif text-ink">
          <span className="text-lg">{event.dayName}</span>
          <span className="h-px w-8 bg-gold/50" />
          <span className="font-display italic text-5xl text-coral">{event.dateNum}</span>
          <span className="h-px w-8 bg-gold/50" />
          <span className="text-lg">
            {event.month} {event.year}
          </span>
        </div>
        <p className="mt-2 font-serif text-base tracking-wide text-ink-soft">
          {event.time}
        </p>

        {event.blessing && (
          <p className="mt-4 max-w-md font-serif text-base italic text-rust-soft">
            {event.blessing}
          </p>
        )}

        <p className="mt-4 font-serif text-base italic text-ink">
          Venue:{" "}
          {event.mapUrl ? (
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold/60 underline-offset-4 transition hover:text-rust"
            >
              {event.venue}
            </a>
          ) : (
            event.venue
          )}
        </p>
      </div>
    </Reveal>
  );
}
