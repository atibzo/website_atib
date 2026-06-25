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
  /** Optional invitation media (vertical card). Falls back to a styled card. */
  media?: Media;
  blessing?: string;
};

export const siteConfig = {
  // ── The couple ──────────────────────────────────────────────────────────
  couple: {
    groom: {
      firstName: "Sourabh",
      parents: "Son of Mr. Kamlesh M Mehta & Mrs. Madhu Mehta",
      grandparents: "(Grandson of Late Shri Motilalji Mehta & Late Smt. Jaywanti)",
    },
    bride: {
      firstName: "Tejaswini",
      parents: "Daughter of Mr. Kedar M Ghasari & Mrs. Shaila",
      grandparents:
        "(Granddaughter of Late Shri Marutirao Ghasari & Smt Chanda, Smt Ranjana)",
    },
  },

  // ── The wedding date (used by Save-the-Date + countdown maths) ────────────
  // ISO 8601, local time of the main ceremony.
  weddingDate: "2026-05-08T11:00:00+05:30",
  hashtag: "#SourabhWedsTejaswini",

  // ── Invitation / hero card ────────────────────────────────────────────────
  invitation: {
    // Devanagari shloka shown beneath the Ganesha mark.
    shloka: [
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।",
      "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    ],
    blessing:
      "With the blessings of the Almighty & our respected elders, we joyfully request your gracious presence on the wedding celebration of",
  },

  // ── Intro: scroll-unfold letter video ─────────────────────────────────────
  // The site opens on this video; scrolling scrubs it open like a letter.
  intro: {
    video: "/media/a-sacred-union.mp4",
    // Optional poster frame shown before the video can paint.
    poster: "/decor/intro-poster.svg",
  },

  // ── Save the Date (scratch hearts) ────────────────────────────────────────
  saveTheDate: {
    eyebrow: "Save the Date",
    heading: "Reveal Our Big Day",
    instruction: "Scratch the hearts to reveal",
    // One reveal per heart (left → right).
    hearts: [
      { hint: "Day", value: "08" },
      { hint: "Month", value: "MAY" },
      { hint: "Year", value: "2026" },
    ],
  },

  // ── Gallery: Our Beautiful Moments ────────────────────────────────────────
  gallery: {
    eyebrow: "A Glimpse of Us",
    heading: "Our Beautiful Moments",
    // Add the couple's photos/videos here. Placeholders ship by default.
    media: [
      {
        type: "video",
        src: "/media/a-sacred-union.mp4",
        poster: "/decor/moment-1.svg",
        alt: "Sourabh & Tejaswini — A Sacred Union",
      },
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
        dateLabel: "07TH MAY, 2026",
        name: "Sangeet",
        dayName: "Thursday",
        dateNum: "07",
        month: "May",
        year: "2026",
        time: "8:00 PM Onwards",
        venue: "Woodrose Banquets and Hotel, Belagavi",
        mapUrl: "https://maps.google.com/?q=Woodrose+Banquets+and+Hotel+Belagavi",
        media: {
          type: "image",
          src: "/decor/event-sangeet.svg",
          alt: "Sangeet invitation",
        },
        blessing: "An evening of music, dance & celebration.",
      },
      {
        dateLabel: "08TH MAY, 2026",
        name: "Marriage",
        dayName: "Friday",
        dateNum: "08",
        month: "May",
        year: "2026",
        time: "11:00 AM",
        venue: "Woodrose Banquets and Hotel, Belagavi",
        mapUrl: "https://maps.google.com/?q=Woodrose+Banquets+and+Hotel+Belagavi",
        media: {
          type: "image",
          src: "/decor/event-marriage.svg",
          alt: "Wedding Ceremony invitation",
        },
        blessing: "Sacred vows, eternal bond, blessed beginnings.",
      },
    ] as WeddingEvent[],
  },

  // ── RSVP ──────────────────────────────────────────────────────────────────
  rsvp: {
    eyebrow: "Be Our Guest",
    heading: "Will You Join Us?",
    intro:
      "Your presence would make our celebration complete. Kindly let us know by 30th April, 2026.",
    deadline: "30th April, 2026",
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
