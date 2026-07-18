# Ahmed Selim Mohamed — Developer Portfolio

A single-page circuit-board themed developer portfolio: a rotating 3D chip
in the hero with your name "printed" on the board below it, animated PCB
traces with traveling current pulses running behind the whole site, and
chip-module style panels (cut corners, glowing blue edges, 3D tilt on
hover) for every card. Built with React + TypeScript + Vite + Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Before you deploy — 3 things to finish

1. **CV file** — put your real CV at `public/Ahmed_Selim_CV.pdf`. The
   navbar and hero "Download CV" buttons already link to that path.
2. **Profile photo** — drop your photo into `src/assets/` and swap it into
   the panel in `src/components/sections/About.tsx` (currently a
   placeholder box).
3. **WhatsApp & Telegram links** — `src/data/projects.ts` has placeholder
   values for `contact.whatsapp` and `contact.telegram`. Swap in your real
   number (`https://wa.me/2xxxxxxxxxx`) and username (`https://t.me/xxxxx`).
4. **Contact form (EmailJS)** — create a free account at
   [emailjs.com](https://www.emailjs.com), set up an email service +
   template, then copy `.env.example` to `.env` and fill in:
   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```
   Until this is set, the form will show a friendly error instead of
   silently failing.

## Project links

Update `src/data/projects.ts` with live URLs for **Launchly** and **Slate**
once they're deployed — that file is the single source of truth for all
project data, so nothing else needs to change.

## The visual system

- **`src/components/effects/CircuitBackground.tsx`** — canvas-based,
  procedurally generated right-angle PCB traces with glowing pulses that
  continuously travel along them (like current flowing through the
  board). Used globally (faint, fixed) and more strongly in the Hero and
  Contact sections.
- **`src/components/three/Chip3D.tsx`** — the rotating 3D chip in the
  hero (react-three-fiber), gently reacting to mouse position.
- **`src/components/ui/Panel.tsx`** — the reusable "chip module" card:
  cut corners, gradient blue edge, real 3D tilt that follows the cursor.
  Used for the About photo, project screenshots, and the contact form.
- **`src/components/sections/ContactGrid.tsx`** — the "power grid" contact
  widget: static circuit lines run from a central chip out to five nodes
  (CV, LinkedIn, WhatsApp, Telegram, email), each with a faint ambient
  pulse; hovering a node sends a bright surge down its line and lights
  the node up.

## Deploying to Vercel

```bash
npm install -g vercel   # if you don't have it
vercel
```

Or connect the GitHub repo to Vercel directly from the dashboard — it
auto-detects Vite and needs no extra config. Remember to add the three
`VITE_EMAILJS_*` variables in Vercel's Environment Variables settings too,
since `.env` itself isn't committed.

## Notes

- **Routing:** single page with hash-linked sections (`#about`,
  `#projects`, `#contact`) — `scrollIntoView` + `IntersectionObserver`
  handle active-link highlighting, no router library needed.
- **Framer Motion / GSAP:** installed and available if you want spring
  physics somewhere later; current animations are CSS + `IntersectionObserver`
  to keep the bundle lean.
- **Three.js:** lazy-loaded (code-split), so it only downloads once the
  Hero is about to render.
