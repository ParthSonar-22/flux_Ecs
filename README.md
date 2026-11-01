# FLUX-ECS Technical Portal & Secretariat Console

The official web platform of **FLUX-ECS**, the technical collective of the Department of Electronics and Computer Science at **VESIT, Mumbai**.

Built with **Next.js (App Router)**, **JavaScript**, **Tailwind CSS v3.4**, **GSAP**, and a single unified **API Service Layer** with local mock resilience.

---

## 🛠️ Tech Stack & Key Features

- **Framework**: Next.js (App Router)
- **Language**: JavaScript (ES6+ / React 19)
- **Styling**: Tailwind CSS v3.4 + Custom tokens (`paper`, `card`, `tan`, `ink`, `brick`, `muted`)
- **Theme-Adaptive Custom Cursor**: Smooth, interpolated dual-element cursor that dynamically shifts hue, glow, and scale between light mode and dark mode, with magnetic expansion on interactive targets.
- **3D Council Flip Cards**: Interactive 3D perspective flip (`rotateY(180deg)`). The front displays the member photo, name, and post; clicking the card flips it in 3D to reveal their motto/quote, written biography, and back-side social coordinates (LinkedIn, GitHub, Instagram, Phone).
- **Single API Service Layer**: Centralized under `services/api.js` using `NEXT_PUBLIC_API_BASE_URL`. Includes loading skeletons, empty states ("No upcoming events"), and error states with retry.
- **Auth & Secretariat Admin Panel**: Accessible at `/admin` with token-based session handling, image previews, delete confirmation dialogs, and full CRUD for Events, Posts, Council Members, and Gallery.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local`:

```env
# Optional External Backend Base URL (defaults to Next.js API routes when empty)
NEXT_PUBLIC_API_BASE_URL=

# Administrative console credentials
ADMIN_PASSWORD=flux2026
ADMIN_SECRET=flux_ecs_local_dev_hmac_secret_key_32_bytes_long

# Optional MongoDB connection (Atlas or local)
MONGODB_URI=
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Routes & Public Pages

- `/` — **Home**: Editorial Broadsheet Masthead, GSAP-animated Hero & Complexity Ledger, Why the Club, Tools & Topics, Featured Event card, IoTA Archives glimpse, CTA banner.
- `/events` — **Events**: Dynamic proceedings docket auto-sorted into upcoming vs past based on dates. Includes loading skeletons and empty states.
- `/blog` — **Blog & News**: Official broadsheet gazette *The Flux Dispatch* with category filters and newsletter subscription widget.
- `/gallery` — **Gallery**: Department media archives with category filtering (All, Exhibition, Robotics, Hardware, Competitions) and high-res lightbox inspection.
- `/about` — **About & Council**: Department charter, Three Pillars, Faculty In-charge cards, and 3D flipping council cards (Senior & Junior Council with back-side social icons).
- `/contact` — **Contact**: Council secretariat coordinates, verified phones, direct inquiry form (POST `/api/contact`), and WhatsApp group banner.
- `/admin` — **Admin Console**: Password-protected administrative secretariat console for full CRUD operations on Events, Posts, Members, and Gallery items.

---

## 📡 API Service Layer & Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `POST /api/admin/login` | POST | Authenticates administrative passkey and returns session token |
| `GET /api/events` | GET | Returns dynamic event list |
| `POST /api/events` | POST | Creates a new event (Title, dates, venue, poster, etc.) |
| `PUT /api/events/:id` | PUT | Modifies existing event details |
| `DELETE /api/events/:id` | DELETE | Removes event from public schedule |
| `GET /api/posts` | GET | Retrieves published dispatches and stories |
| `POST /api/posts` | POST | Publishes new gazette story |
| `PUT /api/posts/:id` | PUT | Updates existing post |
| `DELETE /api/posts/:id` | DELETE | Deletes post |
| `GET /api/members` | GET | Returns active council roster with social coordinates |
| `POST /api/members` | POST | Adds council member |
| `PUT /api/members/:id` | PUT | Updates member bio, role, or links |
| `DELETE /api/members/:id` | DELETE | Removes member from roster |
| `GET /api/gallery` | GET | Returns gallery images |
| `POST /api/gallery` | POST | Uploads/registers new gallery item |
| `DELETE /api/gallery/:id` | DELETE | Removes gallery item |
| `POST /api/contact` | POST | Submits student inquiries to MongoDB with rate limiting |
| `POST /api/subscribe` | POST | Registers email to newsletter subscriber collection |
| `GET /api/admin/export` | GET | Streams CSV export of all newsletter subscribers |

---

## 📁 Folder Structure

```
├── app/
│   ├── about/page.js              # About & Department charter + Flipping Council Cards
│   ├── admin/page.js              # Full-featured CRUD Admin Dashboard
│   ├── api/                       # API Route Handlers (events, posts, members, gallery, admin)
│   ├── blog/page.js               # News, announcements, event write-ups
│   ├── contact/page.js            # Secretariat contacts and submission form
│   ├── events/page.js             # Auto-sorted upcoming/past events with dynamic data
│   ├── gallery/page.js            # Interactive department gallery with filters & lightbox
│   ├── globals.css                # Custom cursor classes, 3D flip card styles, theme variables
│   ├── layout.js                  # Custom Cursor, Navbar, Footer, Google fonts
│   └── page.js                    # Home page
├── components/
│   ├── CustomCursor.js            # Dynamic cursor that adapts to light/dark theme
│   ├── CouncilMemberCard.js       # 3D Flip Card: Front (photo/name/role), Back (bio/quote/socials)
│   ├── SmartImage.js              # Robust image component with loading skeleton & fallback
│   ├── EventsView.js              # Connected to api.events with loading/empty/error states
│   ├── BlogView.js                # Connected to api.posts with loading/empty/error states
│   ├── GalleryView.js             # Dynamic gallery view with category filtering
│   ├── AdminDashboard.js          # Interactive tabbed admin CRUD manager with live previews & toasts
│   └── ...
├── data/
│   ├── team.js                    # Enriched with verified links (LinkedIn, Insta, GitHub)
│   ├── events.js                  # Event store & schema
│   ├── posts.js                   # Posts store & schema
│   ├── gallery.js                 # Gallery items store & schema
│   └── site.js                    # Site constants
├── services/
│   ├── api.js                     # Unified API service layer with env base URL & fallback
│   ├── auth.js                    # AuthService interface for login/logout/token/session
│   └── apiContracts.md            # Comprehensive API specification for backend developers
```
