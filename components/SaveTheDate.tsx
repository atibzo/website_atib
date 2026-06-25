import { siteConfig } from "@/config/site";
import Reveal from "@/components/Reveal";
import ScratchCard from "@/components/ScratchCard";

const { saveTheDate } = siteConfig;

export default function SaveTheDate() {
  return (
    <section
      id="save-the-date"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center"
    >
      <Reveal>
        <p className="eyebrow">{saveTheDate.eyebrow}</p>
        <h2 className="heading-script mx-auto mt-4 max-w-3xl">
          {saveTheDate.heading}
        </h2>
        <p className="mt-4 font-serif text-lg italic text-rust-soft">
          {saveTheDate.instruction}
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-12">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {saveTheDate.hearts.map((heart, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <ScratchCard label="SCRATCH">
                <div className="flex flex-col items-center">
                  <span className="font-script text-5xl text-rust">
                    {heart.value}
                  </span>
                </div>
              </ScratchCard>
              <span className="eyebrow text-gold/80">{heart.hint}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
