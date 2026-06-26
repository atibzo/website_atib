import { siteConfig } from "@/config/site";
import Reveal from "@/components/Reveal";

const { couple, footer, hashtag, events } = siteConfig;

export default function Footer() {
  return (
    <footer className="relative z-10 flex flex-col items-center px-4 py-20 text-center">
      <Reveal>
        <p className="font-script text-5xl text-gold sm:text-6xl">
          {couple.groom.firstName} &amp; {couple.bride.firstName}
        </p>
        <p className="mt-4 font-serif text-lg italic text-ink">
          {Number(events.list[0].dateNum)} &ndash;{" "}
          {Number(events.list[events.list.length - 1].dateNum)}{" "}
          {events.list[events.list.length - 1].month}{" "}
          {events.list[events.list.length - 1].year} · Goa
        </p>
        <p className="mx-auto mt-6 max-w-md font-serif text-base text-ink-soft">
          {footer.thankYou}
        </p>
        <p className="mt-6 font-serif text-sm uppercase tracking-[0.3em] text-rust">
          {hashtag}
        </p>
      </Reveal>
    </footer>
  );
}
