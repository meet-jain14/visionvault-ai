# VisionVault AI — v2 Frontend

A premium frontend for a semantic image search tool, built around the principle
that search is the product — not a hero banner above a feature list.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Design notes

- **Signature motif — the aperture ring.** The search field is framed like a
  camera focus ring, and its border glows amber when focused (`.aperture-ring`
  in `globals.css`). Similarity scores on result cards reuse the same ring
  language as a radial dial instead of a generic progress bar — tying the
  "vision" in VisionVault to an actual optical metaphor without resorting to
  literal camera iconography everywhere.
- **Palette.** Warm near-black (`--bg: #0D0E10`), not pure black or neon-green.
  Single accent: amber (`--accent: #E8A33D`), used sparingly for focus states,
  the active mode toggle, and similarity rings.
- **Type.** Inter for UI text, JetBrains Mono for anything data-like (counts,
  similarity percentages, status figures) — a tool should look like it's
  reporting numbers, not narrating them.
- **No marketing scaffolding.** No pricing, no feature grid, no testimonials.
  The hero *is* the search bar.

## Wiring to the real backend

Replace the mock calls with the existing endpoints:

- `HeroSearch` → `onSearch` should call `GET /api/search?query=...` (text mode)
  or `POST /api/search-by-image` (image mode), and pass the results into
  `<SearchResults results={...} />` in `app/page.tsx`.
- `UploadSection` → wire `simulateUpload` to `POST /api/upload`, using the
  real upload progress event instead of the interval timer.
- `Gallery` → replace `mockGallery` with a `GET /api/images` fetch (consider
  paginating once the dataset is large).

## File map

```
app/
  layout.tsx       fonts + global shell
  page.tsx          page composition + search state
  globals.css       design tokens, aperture-ring styles
components/
  Navbar.tsx
  HeroSearch.tsx    the hero — search-as-product
  SearchResults.tsx
  UploadSection.tsx
  Gallery.tsx       masonry via column-split, no library
  ImageModal.tsx
  Footer.tsx
lib/
  types.ts
  mock-data.ts
```
