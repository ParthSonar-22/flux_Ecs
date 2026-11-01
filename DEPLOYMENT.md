# FLUXECS V2 — PRODUCTION DEPLOYMENT GUIDE (VERCEL)

**Target Production Domain:** `https://aarya-fluxecs.vercel.app`  
**Repository:** `https://github.com/ParthSonar-22/flux_Ecs`  
**Branch:** `feat/fluxecs-homepage-v2`  
**Framework:** Next.js 16.4.3 (App Router)  
**Node.js Runtime:** Node 20.x or Node 22.x  

---

## 1. Pre-Deployment Readiness Check

Before deploying the feature branch to Vercel, ensure you have:
1. Access to the GitHub repository: `https://github.com/ParthSonar-22/flux_Ecs`.
2. A free MongoDB Atlas cluster (M0 or higher).
3. A free Supabase project for persistent media storage (optional, recommended for posters & PDFs).
4. Administrative credentials to be used by the council secretariat.

---

## 2. Environment Variables Specification

Configure the following environment variables in the **Vercel Project Dashboard** under **Settings → Environment Variables**:

| Variable Name | Required | Example / Description |
| :--- | :--- | :--- |
| `MONGODB_URI` | **YES (Production)** | `mongodb+srv://flux_admin:<password>@cluster0.mongodb.net/flux_ecs?retryWrites=true&w=majority`<br>Enables persistent database storage for events, blogs, resources, site copy, council rosters, and inquiries. |
| `ADMIN_PASSWORD` | **YES** | A strong secret key used for the root Super Admin login (e.g. `Secretariat#Flux2026!`). |
| `ADMIN_SECRET` | **YES** | Random 32+ character hex string used to sign HMAC tokens (e.g. run `openssl rand -hex 32`). |
| `NEXT_PUBLIC_SITE_URL` | **YES** | `https://aarya-fluxecs.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional (Recommended) | `https://xyzcompany.supabase.co` (from Supabase Project Settings → API). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase public anon key. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional (Recommended) | Supabase service role key (enables serverless image and PDF uploads). |
| `SUPABASE_STORAGE_BUCKET` | Optional | Bucket name for uploads. Defaults to `media`. |
| `NEXT_PUBLIC_RADIO_URL` | Optional | Custom stream URL or audio file. Defaults to `/media/ambient-pit.wav`. |

---

## 3. Step-by-Step Vercel Setup

### Step A: Import Repository
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New... → Project**.
3. Select `ParthSonar-22/flux_Ecs`.
4. Choose branch: `feat/fluxecs-homepage-v2`.

### Step B: Configure Build Settings
- **Framework Preset:** `Next.js`
- **Root Directory:** `./` (or leave blank if repository root is the website directory)
- **Build Command:** `npm run build`
- **Output Directory:** Automatically set by Next.js (`.next`)
- **Install Command:** `npm install`

### Step C: Add Environment Variables
Paste the variables from Section 2 into the Vercel dashboard for both **Production** and **Preview** environments.

### Step D: Supabase Storage Configuration (If using Cloud Storage)
1. In your [Supabase Dashboard](https://supabase.com), navigate to **Storage**.
2. Click **New Bucket**.
3. Name the bucket `media`.
4. Set it to **Public Bucket** so posters and photos can be viewed by public visitors.
5. In **Policies**, add a policy allowing `INSERT` for authenticated service roles, and `SELECT` for public visitors.

### Step E: Initial Database Seeding
You do not need to write a migration script.
When the application first boots on Vercel with `MONGODB_URI` connected:
1. `lib/events-store.js` checks if the `events` collection is empty. If empty, it automatically seeds all initial events from `data/events-store.json`.
2. `lib/blogs-store.js` checks and seeds initial technical guides from `data/blogs-store.json`.
3. `lib/resources-store.js` checks and seeds all engineering resources from `data/resources-store.json`.
4. `lib/site-content.js` checks and seeds homepage hero slides, copy, faculty, and council members from `data/site-content.json`.
5. `lib/admins-store.js` seeds the initial Super Admin account (`buildwithaarya@gmail.com`).

---

## 4. Verification Post-Deployment

Once deployed to `https://aarya-fluxecs.vercel.app`:
1. **Public Site Check:**
   - Verify `/` renders with the official FluxECS wordmark, slideshow, and footer.
   - Verify `/events` displays upcoming and past events.
   - Verify `/about` displays faculty and council cards with vibrant photos.
   - Verify `/blog` and `/resources` load articles and download links.
2. **Admin Console Check:**
   - Navigate to `/admin`.
   - Enter your `ADMIN_PASSWORD`.
   - Verify dashboard loads with Events, Editor, Analytics, Admins, and Inquiries.
   - Test changing a hero subtitle or adding a test event to confirm database write.
3. **PitRadio Check:**
   - Click the radio icon in the bottom navigation.
   - Verify smooth toggle without unexpected autoplay.

---

## 5. Rollback & Maintenance

- If any configuration issue occurs, Vercel allows instant 1-click rollbacks under **Deployments → Promote to Production**.
- The fallback JSON stores remain safely committed in the repository as a baseline backup.
