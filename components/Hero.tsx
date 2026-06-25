import Image from "next/image";
import { siteConfig } from "@/config/site";
import FloralBorder from "@/components/decor/FloralBorder";
import Reveal from "@/components/Reveal";

const { invitation, couple } = siteConfig;

/**
 * The invitation card the intro letter "opens" into: auspicious mark, shloka,
 * blessing, both names in script with family lines, and a scroll cue.
 */
export default function Hero() {
  return (
    <section
      id="invitation"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24"
    >
      <FloralBorder />

      <Reveal className="relative z-10 w-full max-w-2xl">
        <div className="relative rounded-[28px] bg-card/90 px-6 py-12 shadow-card backdrop-blur-sm sm:px-12 sm:py-16">
          {/* inner gold corner brackets */}
          <CardCorners />

          {/* auspicious mark */}
          <div className="flex justify-center">
            <Image
              src="/decor/ganesha.svg"
              alt="Auspicious mark"
              width={96}
              height={96}
              className="h-20 w-20 sm:h-24 sm:w-24"
            />
          </div>

          {/* shloka */}
          <div className="mt-5 text-center font-deva text-sanskrit">
            {invitation.shloka.map((line, i) => (
              <p key={i} className="text-sm leading-relaxed tracking-wide sm:text-base">
                {line}
              </p>
            ))}
          </div>

          {/* blessing */}
          <p className="mx-auto mt-7 max-w-md text-center font-serif text-base italic leading-relaxed text-ink sm:text-lg">
            {invitation.blessing}
          </p>

          {/* groom */}
          <NameBlock
            name={couple.groom.firstName}
            parents={couple.groom.parents}
            grandparents={couple.groom.grandparents}
          />

          {/* ampersand divider */}
          <div className="my-2 flex items-center justify-center gap-4">
            <Rule />
            <span className="font-script text-5xl text-gold sm:text-6xl">&amp;</span>
            <Rule />
          </div>

          {/* bride */}
          <NameBlock
            name={couple.bride.firstName}
            parents={couple.bride.parents}
            grandparents={couple.bride.grandparents}
          />
        </div>
      </Reveal>

      {/* scroll cue */}
      <a
        href="#save-the-date"
        className="group mt-12 flex flex-col items-center gap-2"
        aria-label="Scroll to Save the Date"
      >
        <span className="eyebrow">Scroll</span>
        <svg
          className="animate-bounce-soft text-gold"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}

function NameBlock({
  name,
  parents,
  grandparents,
}: {
  name: string;
  parents: string;
  grandparents: string;
}) {
  return (
    <div className="text-center">
      <h2 className="font-script text-6xl leading-tight text-gold sm:text-7xl md:text-8xl">
        {name}
      </h2>
      <p className="mt-2 font-serif text-sm text-ink sm:text-base">{parents}</p>
      <p className="font-serif text-xs italic text-ink-soft sm:text-sm">
        {grandparents}
      </p>
    </div>
  );
}

function Rule() {
  return <span className="h-px w-10 bg-gold/60 sm:w-16" />;
}

function CardCorners() {
  const c = "pointer-events-none absolute h-7 w-7 border-gold/50";
  return (
    <span aria-hidden="true">
      <span className={`${c} left-3 top-3 border-l border-t`} />
      <span className={`${c} right-3 top-3 border-r border-t`} />
      <span className={`${c} bottom-3 left-3 border-b border-l`} />
      <span className={`${c} bottom-3 right-3 border-b border-r`} />
    </span>
  );
}
