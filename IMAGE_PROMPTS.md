# Photoreal artwork — generation prompts & how to swap them in

The site currently uses hand-built **SVG** illustrations for the event cards and
floral header. To reach the rich, painterly look of the reference invitation,
generate **real images** with any AI image tool (Midjourney, DALL·E, Ideogram,
Leonardo, Firefly…) using the prompts below, then drop them in — no code needed.

## How to swap them in

1. Generate each image (recommended **portrait 3:4**, e.g. 1080×1440, PNG/JPG).
2. Save into `public/media/` with these names:
   - `event-haldi.jpg`
   - `event-sangeet.jpg`
   - `event-nikah.jpg`
   - `floral-header.png` (transparent background)
3. In `config/site.ts`, add a `media` field to each event (it **overrides** the
   SVG illustration):
   ```ts
   // inside the relevant events.list[] entry
   media: { type: "image", src: "/media/event-haldi.jpg", alt: "Ameen & Haldi" },
   ```
4. For the floral header, point it at your PNG — in
   `components/decor/FloralBorder.tsx` change both `src="/decor/floral-border.svg"`
   to `src="/media/floral-header.png"`.
5. Commit & push — Vercel redeploys automatically.

> Tip: **Ideogram** and **DALL·E** render baked-in text best. If you want the
> name/date *printed inside the image*, add it to the prompt; otherwise leave the
> image text-free and the site overlays the name/date/time for you (cleaner, and
> stays editable).

---

## Event card prompts (portrait 3:4)

**Shared style suffix** (append to each): *“elegant Indian-Muslim wedding
e-invitation card illustration, painterly digital art, soft warm lighting, coral
/ teal / gold palette, Goa beach-resort setting, ornate gold border, highly
detailed, romantic, tasteful, vertical 3:4.”*

### 1) Ameen & Haldi — `event-haldi.jpg`
> A sunny daytime poolside Haldi at a Goa resort: a couple seated on a low
> marigold-decorated platform beside a sparkling turquoise swimming pool,
> turmeric bowls and brass thalis, marigold garlands and toran strings overhead,
> palm trees around the pool deck, marigold petals floating on the water, bright
> cheerful golden-yellow and coral tones. *(+ shared style suffix)*

### 2) Sangeet — `event-sangeet.jpg`
> A glamorous evening Sangeet under a dusk sky: a stage with flowing drapes,
> hanging disco balls and cascading warm fairy-lights, a crescent moon, a couple
> dancing in elegant Indo-western attire, bokeh sparkle, deep teal-to-coral
> sunset gradient with gold highlights, festive and dreamy.
> *(+ shared style suffix)*

### 3) Nikah — `event-nikah.jpg`
> A serene beach Nikah on the lawns of a Goa resort at golden hour: an ornate
> floral arch (coral, blush and marigold blooms with greenery) on the sand facing
> a calm teal sea, soft drapes, a couple standing under the arch, a delicate gold
> crescent in a pastel sky, refined and romantic.
> *(+ shared style suffix)*

---

## Floral header prompt — `floral-header.png`

> A wide watercolour floral garland border for a wedding website header:
> blush-pink and coral roses and peonies with soft sage-green foliage, small
> golden buds and baby's-breath, painterly watercolour style, delicate, elegant,
> **fully transparent background (PNG)**, arranged as a horizontal corner spray
> that trails toward the centre, leaving the middle mostly empty.

Generate one spray; the site mirrors it to both top corners automatically.
Aim for a wide aspect (e.g. 1600×1000) with the flowers weighted to one side.
