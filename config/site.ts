/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL WEBSITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 *  Edit the values below to update the website. You generally do not need to
 *  touch any other file. Drop photos/videos into `public/media/`, the audio
 *  track into `public/audio/`, then point the relevant `src` fields here.
 *
 *  Values were pre-filled from the reference invitation; replace freely.
 */

export type Media = {
  type: "image" | "video";
  src: string;
  poster?: string; // optional preview image for videos
  alt: string;
};

export type WeddingEvent = {
  /** Small uppercase label above the name, e.g. "07TH MAY, 2026" */
  dateLabel: string;
  /** Brush-script ceremony name, e.g. "Sangeet" */
  name: string;
  dayName: string; // "Thursday"
  dateNum: string; // "07"
  month: string; // "May"
  year: string; // "2026"
  time: string; // "8:00 PM Onwards"
  venue: string;
  mapUrl?: string;
  /** Bespoke illustrated scene for the card. */
  illustration?: "haldi" | "sangeet" | "nikah";
  /** Optional real photo/video; if set, used instead of the illustration. */
  media?: Media;
  blessing?: string;
};

export const siteConfig = {
  // ── The couple ──────────────────────────────────────────────────────────
  couple: {
    groom: {
      firstName: "Atib",
      lastName: "Shaikh",
      parents: "Son of Mr. Mohmadasif Shaikh & Mrs. Rafatnaim Shaikh",
      grandparents: "",
    },
    bride: {
      firstName: "Sana",
      lastName: "Anjum",
      parents: "Daughter of Mr. Kamal Anjum & Mrs. Shahin Naz",
      grandparents: "",
    },
  },

  // ── The wedding date (used by Save-the-Date + countdown maths) ────────────
  // ISO 8601, local time of the main ceremony (the Nikah).
  weddingDate: "2026-10-03T15:00:00+05:30",
  hashtag: "#AtibWedsSana",

  // ── Invitation / hero card ────────────────────────────────────────────────
  invitation: {
    // Emblem shown at the top of the card. Swap this SVG for custom artwork.
    emblem: "/decor/bismillah.svg",
    // Bismillah invocation (Arabic, shown right-to-left) + its meaning.
    invocationArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    invocationMeaning:
      "In the name of Allah, the Most Gracious, the Most Merciful",
    blessing:
      "With the blessings of the Almighty & our respected elders, we joyfully request your gracious presence on the wedding celebration of",
  },

  // ── Intro: scroll-unfold letter video ─────────────────────────────────────
  // The site opens on this video; scrolling scrubs it open like a letter.
  intro: {
    // The intro is a single animation: the envelope opens, then dissolves to
    // the invitation. (No video.)
    openLabel: "Tap to open",
  },

  // ── Save the Date (scratch hearts) ────────────────────────────────────────
  saveTheDate: {
    eyebrow: "Save the Date",
    heading: "Reveal Our Big Day",
    instruction: "Scratch the hearts to reveal",
    // One reveal per heart (left → right).
    hearts: [
      { hint: "Day", value: "03" },
      { hint: "Month", value: "OCT" },
      { hint: "Year", value: "2026" },
    ],
  },

  // ── Gallery: Our Beautiful Moments ────────────────────────────────────────
  gallery: {
    eyebrow: "A Glimpse of Us",
    heading: "Our Beautiful Moments",
    // Add the couple's photos/videos here. Placeholders ship by default.
    media: [
      { type: "image", src: "/decor/moment-1.svg", alt: "A beautiful moment" },
      { type: "image", src: "/decor/moment-2.svg", alt: "A cherished moment" },
      { type: "image", src: "/decor/moment-3.svg", alt: "Together" },
    ] as Media[],
  },

  // ── Events: Sacred Ceremonies ─────────────────────────────────────────────
  events: {
    eyebrow: "Join the Celebration",
    heading: "Sacred Ceremonies",
    list: [
      {
        dateLabel: "02ND OCTOBER, 2026",
        name: "Ameen & Haldi",
        dayName: "Friday",
        dateNum: "02",
        month: "October",
        year: "2026",
        time: "1:00 PM Onwards",
        venue: "Regenta Baywatch Resort, Goa",
        mapUrl: "https://maps.google.com/?q=Regenta+Baywatch+Resort+Goa",
        illustration: "haldi",
        blessing: "Blessings, turmeric & golden beginnings.",
      },
      {
        dateLabel: "02ND OCTOBER, 2026",
        name: "Sangeet",
        dayName: "Friday",
        dateNum: "02",
        month: "October",
        year: "2026",
        time: "7:00 PM Onwards",
        venue: "Regenta Baywatch Resort, Goa",
        mapUrl: "https://maps.google.com/?q=Regenta+Baywatch+Resort+Goa",
        illustration: "sangeet",
        blessing: "An evening of music, dance & celebration.",
      },
      {
        dateLabel: "03RD OCTOBER, 2026",
        name: "Nikah",
        dayName: "Saturday",
        dateNum: "03",
        month: "October",
        year: "2026",
        time: "3:00 PM Onwards",
        venue: "Regenta Beach House, Goa — Beach Lawns",
        mapUrl: "https://maps.google.com/?q=Regenta+Beach+House+Goa",
        illustration: "nikah",
        blessing: "Two souls, one sacred promise — witnessed with love & duas.",
      },
    ] as WeddingEvent[],
  },

  // ── RSVP ──────────────────────────────────────────────────────────────────
  rsvp: {
    eyebrow: "Be Our Guest",
    heading: "Will You Join Us?",
    intro:
      "Your presence would make our celebration complete. Kindly let us know by the date below.",
    // TODO: set your RSVP deadline.
    deadline: "15th September, 2026",
  },

  // ── Background music ──────────────────────────────────────────────────────
  music: {
    // Drop an .mp3 into public/audio/ and update this path. Empty = no music.
    src: "/audio/background.mp3",
    title: "Background music",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    thankYou: "With love & gratitude, we look forward to celebrating with you.",
  },

  // ── Navigation (anchors to section ids) ───────────────────────────────────
  nav: [
    { label: "Invitation", href: "#invitation" },
    { label: "Save the Date", href: "#save-the-date" },
    { label: "Moments", href: "#moments" },
    { label: "Ceremonies", href: "#ceremonies" },
    { label: "RSVP", href: "#rsvp" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
