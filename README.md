# FLUX-ECS Club Website

The official web portal of **FLUX-ECS**, the technical collective of the Department of Electronics and Computer Science at **VESIT, Mumbai**.

Rebuilt with **Next.js (App Router)**, **JavaScript**, **Tailwind CSS v3.4**, **GSAP**, and **MongoDB / Mongoose**.

---


## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS v3.4 with custom theme tokens & CSS variables
- **Motion**: GSAP + `@gsap/react` (Hero headline reveal, complexity ledger stagger, why-the-club scroll brightening)
- **Database**: MongoDB Atlas via cached singleton Mongoose connection
- **Fonts**: EB Garamond, Newsreader, Space Mono (via `next/font/google`), Material Symbols Outlined

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
- `MONGODB_URI`: Your MongoDB Atlas connection URI (e.g. `mongodb+srv://...`)
- `ADMIN_PASSWORD`: Password for `/admin` access
- `ADMIN_SECRET`: HMAC signature secret for administrative session cookies

*(Note: In local development, if `MONGODB_URI` is omitted, the app will gracefully log submissions to console without crashing).*

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🌐 Routes & Pages

- `/` — **Home**: Editorial Broadsheet Masthead, GSAP-animated Hero & Complexity Ledger, Why the Club, Tools & Topics, Featured Event card, IoTA Archives glimpse, CTA banner.
- `/events` — **Events**: Upcoming / Past tab switch (`?tab=past` supported), Algorithm's Auction card, IoTA Archives card with real lab demonstration breakdown & archival plates.
- `/about` — **About**: Department charter, Three Pillars, Council In-charge faculty card, Core Executive Bench (5 appointments), 7 Junior Officer lithographic cards, and Google Maps iframe embed.
- `/blog` — **Blog**: Official broadsheet gazette *The Flux Dispatch*, lead story driven from `data/posts.js` (IoTA Archives write-up), and newsletter subscription widget.
- `/contact` — **Contact**: Council secretariat coordinates, 5 verified phone numbers, direct submission form (POST `/api/contact`), and WhatsApp group banner.
- `/admin` — **Admin Console**: Password-protected secretariat console (`noindex`) listing dispatches, subscribers, and CSV export.

---

## 📡 API Endpoints

- `POST /api/contact` — Submits student inquiries to MongoDB with honeypot and in-memory rate limiting (5 req/min per IP).
- `POST /api/subscribe` — Registers emails to the subscriber collection with honeypot and rate limiting.
- `POST /api/admin/login` — Authenticates admin password and sets an `httpOnly`, `sameSite=lax`, secure cookie.
- `GET /api/admin/export` — Cookie-protected endpoint streaming all subscribers as a CSV file.

---

## ☁️ Deployment on Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the following Environment Variables in the Vercel project settings:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
   - `ADMIN_SECRET`
4. Deploy! Vercel automatically detects Next.js.

---

## 📋 TODOs & Confirmed Items

| Ref | Item | Status | Note |
|---|---|---|---|
| T-01 | `INSTAGRAM` | Placeholder | Set in `data/site.js` (currently `https://www.instagram.com/flux.ecs.vesit`) |
| T-02 | `WHATSAPP_URL` | Configured | `https://chat.whatsapp.com/E4qVg7GYjMRAERBegTFyXP` in `data/site.js` |
| T-03 | `COUNCIL_NAME` | Configured | `"FLUX-ECS Council"` in `data/site.js` |
| T-04 | Poster image | In Place | References `/posters/algorithms-auction.jpg`. Drop official file into `public/posters/` |
| T-05 | Junior officer photos | In Place | Real photos can be placed into `public/team/<name>.jpg` |
| T-06 | No `app/template.js` | Confirmed | Component `<Reveal>` pass-through provided for future animation hooks |
