# Sourabh & Tejaswini — Wedding Website

An elegant, animated Indian wedding invitation site built with **Next.js (App
Router) + TypeScript + Tailwind CSS**, ready to deploy on Vercel.

It opens on a **scroll-unfolding letter video**, then leads into the
invitation, a scratch-to-reveal **Save the Date**, a **moments** carousel, the
**Sacred Ceremonies** schedule, and an **RSVP** form that writes to a Google
Sheet. Floating petals, gold corner frames, a watercolour floral border, and a
background-music toggle complete the aesthetic.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Editing content — one file

**Everything** (names, families, shloka, dates, events, gallery, RSVP copy,
music) lives in **`config/site.ts`**. Edit that file; you rarely need to touch
anything else.

## Adding your media

Drop files into `public/` and point `config/site.ts` at them:

| What | Where | Config field |
| --- | --- | --- |
| Intro letter video | `public/media/a-sacred-union.mp4` | `intro.video` |
| Gallery photos/videos | `public/media/…` | `gallery.media[]` |
| Event invitation videos/images | `public/media/…` | `events.list[].media` |
| Background music | `public/audio/background.mp3` | `music.src` |
| Ganesha / auspicious mark | `public/decor/ganesha.svg` | (used by Hero) |
| Floral top border | `public/decor/floral-border.svg` | (used by Hero) |

The shipped `public/decor/*.svg` files and the placeholder gallery/event cards
are tasteful stand-ins — **replace them with your own artwork/photos**.

Media items use this shape:

```ts
{ type: "video" | "image", src: "/media/your-file.mp4", poster: "/decor/poster.svg", alt: "…" }
```

### About the intro video

The intro is **scroll-scrubbed**: scroll position maps to the video's playback
time, so the letter unfolds as the guest scrolls. For the smoothest scrubbing,
encode the MP4 with `+faststart` and frequent keyframes, e.g.:

```bash
ffmpeg -i input.mp4 -movflags +faststart -g 15 -pix_fmt yuv420p public/media/a-sacred-union.mp4
```

(The site works without re-encoding; this just makes seeking smoother.) Under
`prefers-reduced-motion`, the intro plays through once instead of scrubbing.

## RSVP → Google Sheet

The RSVP form POSTs to a **Google Apps Script Web App** that appends a row to a
spreadsheet you own.

1. Create a new Google Sheet. Add a header row:
   `submittedAt | name | email | attending | guests | events | note`
2. In the Sheet: **Extensions ▸ Apps Script**. Replace the code with:

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const p = e.parameter;
     sheet.appendRow([
       p.submittedAt || new Date().toISOString(),
       p.name || "",
       p.email || "",
       p.attending || "",
       p.guests || "",
       p.events || "",
       p.note || "",
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ result: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. **Deploy ▸ New deployment ▸ Web app.** Set *Execute as* **Me**, *Who has
   access* **Anyone**. Authorize when prompted. Copy the **Web app URL**
   (ends in `/exec`).
4. Set the URL as an environment variable:
   - Local: copy `.env.example` to `.env.local` and set
     `NEXT_PUBLIC_RSVP_ENDPOINT=…/exec`
   - Vercel: **Project ▸ Settings ▸ Environment Variables** →
     `NEXT_PUBLIC_RSVP_ENDPOINT` (Production + Preview), then redeploy.

The form submits with `mode: "no-cors"`, so the browser can't read the
response — a non-throwing request is treated as success. Test by submitting and
checking that a row appears in your Sheet.

## Deploy to Vercel

Push this repo to GitHub and import it in Vercel (framework: **Next.js**,
auto-detected). Add the `NEXT_PUBLIC_RSVP_ENDPOINT` env var. Done.

## Tech notes

- Content-driven via `config/site.ts` (single source of truth).
- Fonts via `next/font/google`: Great Vibes, Yellowtail, Cormorant Garamond,
  Tiro Devanagari Sanskrit.
- Scroll-reveal uses `IntersectionObserver` (`components/Reveal.tsx`); the
  scratch cards share one canvas component (`components/ScratchCard.tsx`).
- All animations respect `prefers-reduced-motion`.
