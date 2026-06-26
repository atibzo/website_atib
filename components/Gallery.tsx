import { siteConfig } from "@/config/site";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";

const { gallery } = siteConfig;

/**
 * "Our Beautiful Moments" — a featured triptych: the landscape highlight sits
 * wide in the centre, flanked by the two portrait photos. Stacks on mobile
 * (highlight first). Mark the centrepiece with `landscape: true` in config.
 */
export default function Gallery() {
  return (
    <section
      id="moments"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center"
    >
      <Reveal>
        <p className="eyebrow">{gallery.eyebrow}</p>
        <h2 className="heading-script mx-auto mt-4 max-w-3xl">{gallery.heading}</h2>
        <p className="divider-star mt-5 text-gold">✦</p>
      </Reveal>

      <Reveal delay={120} className="mt-12 w-full max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-7">
          {gallery.media.map((m, i) =>
            m.landscape ? (
              // centred wide highlight
              <figure
                key={i}
                className="relative order-first aspect-[3/2] w-[90vw] max-w-[560px] flex-none overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-gold/40 md:order-none md:w-[46%] md:max-w-[560px] md:scale-[1.04]"
              >
                <Media media={m} priority />
              </figure>
            ) : (
              <figure
                key={i}
                className="relative aspect-[3/4] w-[64vw] max-w-[230px] flex-none overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-gold/25 md:w-[24%]"
              >
                <Media media={m} />
              </figure>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}
