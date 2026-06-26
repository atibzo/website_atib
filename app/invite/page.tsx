import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Monogram from "@/components/decor/Monogram";
import FloralBorder from "@/components/decor/FloralBorder";
import EventScene, { SceneVariant } from "@/components/decor/EventScene";

const { couple, invitation, events, gallery, footer, hashtag } = siteConfig;

export const metadata: Metadata = {
  title: `${couple.groom.firstName} & ${couple.bride.firstName} — Wedding Invitation`,
  description: "A printable wedding invitation.",
};

/* Celebration span derived from the events, e.g. "2–3 October 2026". */
const first = events.list[0];
const last = events.list[events.list.length - 1];
const dateSpan = `${Number(first.dateNum)}–${Number(last.dateNum)} ${last.month} ${last.year}`;

/**
 * Print-only wedding invitation booklet (route `/invite`). Reuses the site's
 * fonts, palette, florals, crescent emblem, monogram and event illustrations,
 * laid out as A4 pages for rendering to a shareable PDF. No animations, no RSVP.
 */
export default function InvitePage() {
  return (
    <main className="invite-doc font-serif text-ink">
      {/* ── 1 · Cover ──────────────────────────────────────────────────── */}
      <Page tone="cream">
        <Frame />
        <FloralBorder />
        <div className="relative z-10 flex flex-col items-center">
          <p className="eyebrow mb-8">The wedding celebration of</p>
          <Monogram size={150} />
          <h1 className="mt-8 font-script text-[5.5rem] leading-[0.95] text-gold sm:text-[6.5rem]">
            {couple.groom.firstName} <span className="text-coral">&amp;</span>{" "}
            {couple.bride.firstName}
          </h1>
          <Crescent className="my-7" />
          <p className="font-display text-2xl italic text-ink">{dateSpan}</p>
          <p className="mt-1 font-sans text-sm uppercase tracking-[0.4em] text-teal">
            Goa, India
          </p>
          <p className="mt-12 font-sans text-sm tracking-[0.18em] text-gold-soft">
            {hashtag}
          </p>
        </div>
      </Page>

      {/* ── 2 · The Invitation ─────────────────────────────────────────── */}
      <Page tone="cream">
        <Frame />
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={invitation.emblem} alt="" className="h-20 w-20" />
          <p
            dir="rtl"
            lang="ar"
            className="mt-5 font-arabic text-3xl leading-relaxed text-sanskrit"
          >
            {invitation.invocationArabic}
          </p>
          <p className="mt-2 font-serif text-sm italic text-ink-soft">
            {invitation.invocationMeaning}
          </p>

          <p className="mx-auto mt-9 max-w-md font-serif text-lg italic leading-relaxed text-ink">
            {invitation.blessing}
          </p>

          <NameBlock
            name={`${couple.groom.firstName} ${couple.groom.lastName}`}
            parents={couple.groom.parents}
          />
          <div className="my-3 flex items-center justify-center gap-4">
            <Rule />
            <span className="font-script text-5xl text-gold">&amp;</span>
            <Rule />
          </div>
          <NameBlock
            name={`${couple.bride.firstName} ${couple.bride.lastName}`}
            parents={couple.bride.parents}
          />

          <Crescent className="mt-12" />
          <p className="mt-5 font-display text-xl italic text-coral">{dateSpan}</p>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.35em] text-teal">
            Goa, India
          </p>
        </div>
      </Page>

      {/* ── 3 · Our Moments (collage) ──────────────────────────────────── */}
      <Page tone="cream">
        <Frame />
        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
          <p className="eyebrow">{gallery.eyebrow}</p>
          <h2 className="heading-script mt-3 text-5xl">{gallery.heading}</h2>
          <Crescent className="my-7" />

          {(() => {
            const wide = gallery.media.find((m) => m.landscape) ?? gallery.media[0];
            const portraits = gallery.media.filter((m) => m !== wide);
            return (
              <div className="w-full">
                <figure className="overflow-hidden rounded-2xl ring-1 ring-gold/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={wide.src}
                    alt={wide.alt}
                    className="h-[105mm] w-full object-cover"
                  />
                </figure>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  {portraits.map((m) => (
                    <figure
                      key={m.src}
                      className="overflow-hidden rounded-2xl ring-1 ring-gold/40"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.src}
                        alt={m.alt}
                        className="h-[78mm] w-full object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            );
          })()}

          <p className="mt-9 max-w-md text-center font-serif text-lg italic text-ink-soft">
            Every moment with you has led us here — and to a lifetime more.
          </p>
        </div>
      </Page>

      {/* ── 4–6 · One page per ceremony ────────────────────────────────── */}
      {events.list.map((ev, i) => (
        <Page key={ev.name} tone={i % 2 === 0 ? "sand" : "cream"}>
          <Frame />
          <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
            <p className="eyebrow">{ev.dateLabel}</p>
            <h2 className="heading-script mt-3 text-5xl sm:text-6xl">{ev.name}</h2>

            <div
              className="mt-8 w-full max-w-md overflow-hidden rounded-2xl shadow-card ring-1 ring-gold/40"
              style={{ height: "118mm" }}
            >
              {ev.illustration ? (
                <EventScene variant={ev.illustration as SceneVariant} />
              ) : null}
            </div>

            {/* date block */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-teal">
                {ev.dayName}
              </span>
              <span className="font-display text-5xl leading-none text-gold">
                {ev.dateNum}
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-teal">
                {ev.month} {ev.year}
              </span>
            </div>
            <p className="mt-3 font-display text-xl italic text-coral">{ev.time}</p>

            <p className="mt-4 font-serif text-lg text-ink">{ev.venue}</p>
            {ev.mapUrl && (
              <a
                href={ev.mapUrl}
                className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-teal underline decoration-gold/50 underline-offset-4"
              >
                View on map →
              </a>
            )}

            {ev.blessing && (
              <p className="mt-6 max-w-sm font-serif text-base italic text-ink-soft">
                {ev.blessing}
              </p>
            )}
          </div>
        </Page>
      ))}

      {/* ── 7 · Closing ────────────────────────────────────────────────── */}
      <Page tone="cream">
        <Frame />
        <div className="relative z-10 flex flex-col items-center text-center">
          <Crescent className="mb-8" />
          <p className="mx-auto max-w-md font-display text-3xl italic leading-snug text-coral">
            {footer.thankYou}
          </p>
          <div className="mt-12">
            <Monogram size={120} />
          </div>
          <h2 className="mt-6 font-script text-6xl text-gold">
            {couple.groom.firstName} <span className="text-coral">&amp;</span>{" "}
            {couple.bride.firstName}
          </h2>
          <p className="mt-8 font-sans text-sm tracking-[0.18em] text-gold-soft">
            {hashtag}
          </p>
        </div>
      </Page>
    </main>
  );
}

/* ── helpers ──────────────────────────────────────────────────────────────── */

function Page({
  children,
  tone = "cream",
}: {
  children: React.ReactNode;
  tone?: "cream" | "sand";
}) {
  const bg =
    tone === "sand"
      ? "linear-gradient(160deg,#F4E6D4,#EBD7B6)"
      : "linear-gradient(160deg,#FBF3E9,#F3E3CB)";
  return (
    <section
      className="invite-page flex flex-col items-center justify-center px-16 py-20"
      style={{ background: bg }}
    >
      {children}
    </section>
  );
}

/* Gold double inset border with corner dots. */
function Frame() {
  return (
    <span aria-hidden="true" className="pointer-events-none">
      <span className="absolute inset-[10mm] border border-gold/45" />
      <span className="absolute inset-[12mm] border border-gold/20" />
      {[
        "left-[10mm] top-[10mm]",
        "right-[10mm] top-[10mm]",
        "left-[10mm] bottom-[10mm]",
        "right-[10mm] bottom-[10mm]",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/70 ${pos}`}
        />
      ))}
    </span>
  );
}

function NameBlock({ name, parents }: { name: string; parents: string }) {
  return (
    <div className="text-center">
      <h3 className="font-script text-6xl leading-tight text-gold">{name}</h3>
      <p className="mt-2 font-serif text-base text-ink">{parents}</p>
    </div>
  );
}

function Rule() {
  return <span className="h-px w-16 bg-gold/60" />;
}

/* Small crescent-and-star divider, echoing the site emblem. */
function Crescent({ className = "" }: { className?: string }) {
  return (
    <svg
      width="80"
      height="22"
      viewBox="0 0 80 22"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <line x1="0" y1="11" x2="28" y2="11" stroke="#A8852F" strokeWidth="1" />
      <line x1="52" y1="11" x2="80" y2="11" stroke="#A8852F" strokeWidth="1" />
      <path
        d="M44 4 a7 7 0 1 0 0 14 a5.5 5.5 0 1 1 0 -14Z"
        fill="#7E5E1C"
      />
      <path
        d="M38 11 l2.2 1.6 -0.85 2.6 2.2 -1.6 2.2 1.6 -0.85 -2.6 2.2 -1.6 -2.72 0 -0.85 -2.6 -0.85 2.6 Z"
        fill="#A8852F"
      />
    </svg>
  );
}
