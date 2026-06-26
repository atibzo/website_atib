# Gallery photos — drop your images here

Add the three "Our Beautiful Moments" images to **this folder** with these exact
file names (case-sensitive). The site already points at them, so once they're
committed they appear automatically (Vercel rebuilds on push):

| File name | Photo | Card shape |
| --- | --- | --- |
| `moment-1.jpg` | Couple — ring ceremony (the standing ring-exchange) | tall portrait (3:4) |
| `moment-2.jpg` | Couple — close-up portrait | tall portrait (3:4) |
| `moment-3.jpg` | Family group photo | wide landscape (3:2) |

Notes:
- `.jpg`, `.jpeg`, `.png`, or `.webp` all work — but keep the name as
  `moment-1`, `moment-2`, `moment-3`. If you use a different extension, update
  the matching `src` in `config/site.ts` → `gallery.media`.
- The third item is marked `landscape: true` in `config/site.ts` so the family
  photo gets a wider card and isn't cropped. To change which photo is landscape,
  move that flag.
- Want more than three? Add files here and add entries to `gallery.media`.

(Adding a file on GitHub: open this folder → **Add file ▸ Upload files** on the
`claude/wedding-website-build-b231sc` branch → drag the three images in →
commit.)
