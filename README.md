# Balcão Homes — real estate landing page (Angular)

A landing page for a Goa agency that finds, restores and sells Portuguese-era houses.
Built with **Angular 22, standalone components** (no NgModules), signals for state, SCSS,
**GSAP + ScrollTrigger** for scroll animation and **Lenis** for smooth scrolling.
Fonts: **Fraunces** (headings) and **Manrope** (text), self-hosted through Fontsource.

## Run it

```bash
npm install
npm start            # http://localhost:4200
npm run build        # production build in dist/claude-angular-project/browser
```

Needs Node 22.22+ or 24.15+.

## Deploy

**Live:** https://balcao-homes.vercel.app (Vercel project `balcao-homes`, account `abhinav0228`).

After changing anything, publish the update with:

```bash
npm run deploy       # Vercel builds the site on its servers and publishes it
```

`vercel.json` tells Vercel how to build (`npm run build`) and which folder to serve
(`dist/claude-angular-project/browser`). `.vercelignore` keeps `node_modules`, builds and `.env*` files out of
the upload. The first time on a new computer, run `npx vercel login` once.

## What is on the page

| Section | What it does |
| --- | --- |
| Preloader | Name rises letter by letter, counter to 100, curtain lifts into the hero |
| Hero | Full-screen photo slideshow with slow zoom, headline rising word by word, featured-house card (3D tilt) |
| Marquee | Village names and promises scrolling in two directions; speeds up with your scroll |
| Story | Paragraph that lights up word by word as you scroll, photo collage with parallax, spinning badge, four material panels that open on hover, counters |
| Two prices | Drag a divider across a house drawing to see it as found / restored; pick a price; down-payment slider; monthly instalment that counts to its new value |
| Houses | Filter by taluka, sort, tilt cards with a "View" cursor, side drawer with full details, enquiry card |
| How it works | Timeline whose line draws as you scroll, steps lighting up; monsoon video |
| Goa | Section pins and the photographs travel sideways (swipe row on phones) |
| Letter | Founder’s quote lighting up over a parallax photo, signature that draws itself |
| Questions | Animated accordion |
| Visit | Form that opens the visitor’s email with everything filled in |
| Footer | Magnetic "Book a visit" button, links, full-width wordmark, photo credits |

Desktop also gets a custom cursor and magnetic buttons. Everything respects `prefers-reduced-motion`
(animations off, content shown at once).

## Folder structure

```
src/
├── index.html, main.ts, styles.scss
├── styles/            _tokens.scss (colours, type, spacing) · _base.scss (buttons, chips) · _motion.scss (entrances)
└── app/
    ├── core/
    │   ├── data/      ← ALL CONTENT: houses.ts, faq.ts, process.ts, site.ts (contact, loan rate), photos.ts
    │   ├── models/    House, Photo
    │   └── utils/     EMI formula, ₹ lakh/crore formatting
    ├── shared/
    │   ├── motion/    motion.ts (Lenis + GSAP), reveal, split-text, pointer (magnetic, tilt), scroll (parallax, count-up, scroll-words)
    │   ├── ui/        house-elevation (SVG drawing of each house), ambient-video, arrow
    │   └── pipes/     {{ price | inr }}
    ├── layout/        preloader, cursor, site-nav, site-footer
    └── features/home/ home.ts, home-state.ts (signals), sections/ hero · marquee · intro · showcase · listings · process · gallery · letter · faq · contact
```

## Change the content

| To… | Edit |
| --- | --- |
| Add, remove or reprice a house | `core/data/houses.ts` (prices in rupees; `featured: true` puts it in the calculator tabs) |
| Questions and answers | `core/data/faq.ts` |
| Restoration timeline | `core/data/process.ts` |
| Email, phone, office, loan rate | `core/data/site.ts` |
| Photographs | Put files in `public/photos/` and edit `core/data/photos.ts` (keep the credit fields) |
| Colours, fonts, sizes | `styles/_tokens.scss` |

## Before launch

- **Every house, price, name and the founder’s letter is sample content.** Replace them with real ones.
- The email, phone number and social links are placeholders.
- The photographs are from Wikimedia Commons (CC BY / CC BY-SA), saved in `public/photos/` and credited
  in the footer. They show Goa’s streets and old houses, **not** houses for sale. The monsoon clip still
  streams from Wikimedia.
- The house drawings are generated from each listing (bays, paint colour, balcão). Replace them with real
  photographs once you have them.
- The FAQ answers describe a typical process. Have a property lawyer check them.
