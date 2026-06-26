# Atib & Sana — Wedding Website

An elegant, animated wedding invitation site built with **Next.js (App Router) +
TypeScript + Tailwind CSS**, ready to deploy on Vercel.

It opens on a **tap-to-open envelope** — a crafted "Goa Sunset" letter with the
A&S monogram; tap it and the flap opens, then it dissolves into the invitation
(a **Bismillah** invocation with the couple's names), a scratch-to-reveal **Save
the Date**, a **moments** carousel, the **Sacred Ceremonies** schedule (Ameen &
Haldi · Sangeet · Nikah) with illustrated event cards, and an **RSVP** form that
writes to a Google Sheet. Floating petals, gold corner frames, a watercolour
floral border, and a background-music toggle complete the aesthetic.

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
| Gallery photos/videos | `public/media/…` | `gallery.media[]` |
| Event card photo/video (overrides illustration) | `public/media/…` | `events.list[].media` |
| Background music | `public/audio/background.mp3` | `music.src` |
| Emblem (crescent & star) | `public/decor/bismillah.svg` | `invitation.emblem` |
| Floral top border | `public/decor/floral-border.svg` | (used by Hero) |

The shipped `public/decor/*.svg` files and the placeholder gallery/event cards
are tasteful stand-ins — **replace them with your own artwork/photos**.

Media items use this shape:

```ts
{ type: "video" | "image", src: "/media/your-file.mp4", poster: "/decor/poster.svg", alt: "…" }
```

### About the intro

The intro is a single, self-contained animation — no video. A crafted SVG/CSS
envelope (`components/decor/Envelope.tsx` + `Monogram.tsx`) shows a "tap to open"
cue; on tap the flap opens in 3D and the overlay dissolves into the invitation.
Tap again (or press `Escape`) to skip; under `prefers-reduced-motion` it opens
and dissolves immediately.

### Event card illustrations

Each ceremony card uses a bespoke vector scene in
`components/decor/EventScene.tsx` (`haldi` / `sangeet` / `nikah`), selected per
event via `events.list[].illustration`. To use a real photo/render instead, set
that event's `media` (`{ type, src, alt }`) — it takes precedence over the
illustration.

## RSVP → Google Sheet

The RSVP form POSTs to a **Google Apps Script Web App** that appends a row to a
spreadsheet you own.

1. Create a new Google Sheet. Add a header row:
   `submittedAt | name | phone | attending | adults | children | childAges | events | note`
2. In the Sheet: **Extensions ▸ Apps Script**. Replace the code with:

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const p = e.parameter;
     sheet.appendRow([
       p.submittedAt || new Date().toISOString(),
       p.name || "",
       p.phone || "",
       p.attending || "",
       p.adults || "",
       p.children || "",
       p.childAges || "",
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
4. Point the site at the URL — either way works (the `/exec` URL is a public
   endpoint, not a secret):
   - **Simplest:** paste it into `config/site.ts` → `rsvp.endpoint: "…/exec"`,
     commit, push.
   - Or set env var `NEXT_PUBLIC_RSVP_ENDPOINT` (`.env.local` for dev; Vercel
     **Project ▸ Settings ▸ Environment Variables** for prod) — this overrides
     the config value.

Tip: do this on your **personal** Google account (log into personal Google
first) so the RSVP sheet lives in your personal Drive.

The form submits with `mode: "no-cors"`, so the browser can't read the
response — a non-throwing request is treated as success. Test by submitting and
checking that a row appears in your Sheet.

## Deploy to Vercel

Push this repo to GitHub and import it in Vercel (framework: **Next.js**,
auto-detected). Add the `NEXT_PUBLIC_RSVP_ENDPOINT` env var. Done.

## Tech notes

- Content-driven via `config/site.ts` (single source of truth).
- Fonts via `next/font/google`: Pinyon Script (names), Fraunces (headings),
  Cormorant Garamond (body), Jost (labels), Amiri (Arabic).
- Scroll-reveal uses `IntersectionObserver` (`components/Reveal.tsx`); the
  scratch cards share one canvas component (`components/ScratchCard.tsx`).
- All animations respect `prefers-reduced-motion`.
