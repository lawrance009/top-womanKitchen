# TopWoman's Kitchen — React redesign

Liberian food, cooked like home. One-page restaurant site built with **React 19 + Vite**, **Tailwind CSS v4** and **Framer Motion**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production files go to dist/
```

## What's on the page

| Section | What it does |
|---|---|
| Hero | Dark, warm intro with an animated photo collage and a spinning "Monrovia to Gönyeli" stamp |
| Menu | Filter by category (animated tabs). "Add to order" on every dish |
| First time? | 3 starter picks + a small dictionary (fufu, kala, palm butter…) for people new to Liberian food |
| How ordering works | Pick → send on WhatsApp → we confirm & cook |
| Our story | About TopWoman |
| Events | Sorts itself: future dates show as **Upcoming**, old ones move to **Past gatherings** |
| Visit | Address, Sundays, phone, email, map |
| Order drawer | The cart. Builds one WhatsApp message with every dish + name + notes. Saved on the device |

## Editing content (no React knowledge needed)

- **Dishes, prices, categories** → `src/data/menu.js` (set `price: 250` to show ₺250, or `null` for "Price on WhatsApp")
- **Events** → `src/data/events.js` (copy the object, change the date — format `YYYY-MM-DD`)
- **Phone, WhatsApp, address, socials** → `src/data/site.js`
- **Colours & fonts** → the `@theme` block in `src/index.css`
- **Photos** → `public/images/` (WebP, already compressed from ~20 MB to ~2 MB)

## Folder layout

```
src/
  App.jsx               page order
  data/                 menu, events, business info  ← edit these
  context/OrderContext  cart state (useReducer + localStorage)
  lib/whatsapp.js       builds wa.me links/messages
  components/           one file per section
public/images/          optimized photos
```

## Deploy

Works on Netlify / Vercel / GitHub Pages: build command `npm run build`, output folder `dist`.
