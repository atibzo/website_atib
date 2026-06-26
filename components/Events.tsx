import { siteConfig, type WeddingEvent } from "@/config/site";
import Reveal from "@/components/Reveal";
import EventCard from "@/components/decor/EventCard";

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
          <EventBlock key={i} event={event} />
        ))}
      </div>
    </section>
  );
}

function EventBlock({ event }: { event: WeddingEvent }) {
  return (
    <Reveal>
      <div className="flex flex-col items-center">
        <EventCard event={event} />

        {event.blessing && (
          <p className="mt-6 max-w-md font-serif text-lg italic text-rust-soft">
            {event.blessing}
          </p>
        )}

        <p className="mt-3 font-serif text-base italic text-ink">
          Venue:{" "}
          {event.mapUrl ? (
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold/60 underline-offset-4 transition hover:text-coral"
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
