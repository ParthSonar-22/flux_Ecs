# FluxECS V2 — Vercel Deployment & Production Setup Guide

**Target Address:** `https://aarya-fluxecs.vercel.app`  
**Git Repository:** `https://github.com/ParthSonar-22/flux_Ecs`  
**Production Branch:** `feat/fluxecs-homepage-v2` (or merged into `main` after review)  
**Node.js Engine:** Node.js 22.x or >=24.x (Vercel default)

---

## 1. Readiness Status: READY FOR CONFIGURATION

The codebase is fully integrated and tested. To deploy successfully on Vercel's serverless platform, the production database and media storage environment variables must be configured in the Vercel Project Settings prior to triggering the production deployment.

---

## 2. Required Environment Variables

Configure these variables in **Vercel Project Dashboard** -> **Settings** -> **Environment Variables**:

| Variable Name | Required | Purpose | Example / Format |
| :--- | :---: | :--- | :--- |
| `MONGODB_URI` | **YES** | Persistent MongoDB Atlas cluster connection for events, blogs, resources, copy, and council rosters. | `mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/flux_ecs?retryWrites=true&w=majority` |
| `ADMIN_PASSWORD` | **YES** | Master authentication key for the council secretariat. | Strong 16+ character password (e.g., `flux_ecs_sec_2026_xK9...`) |
| `ADMIN_SECRET` | **YES** | 32-byte hex secret used to sign HMAC session tokens (`flux_admin_token`). | 64 hex characters (e.g. generated via `openssl rand -hex 32`) |
| `SUPER_ADMIN_EMAIL` | **YES** | Root administrator account with full user management privileges. | `buildwithaarya@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | **YES** | Canonical public URL used for metadata and social graph cards. | `https://aarya-fluxecs.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | **YES** | Supabase project URL for serverless media storage. | `https://xyzcompany.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **YES** | Supabase public anonymous API key. | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | **YES** | Supabase service role key for authorized poster & PDF uploads. | `eyJhbGciOi...` |
| `SUPABASE_STORAGE_BUCKET` | Optional | Bucket name for media assets (default: `media`). | `media` |
| `NEXT_PUBLIC_RADIO_URL` | Optional | Audio transmission stream or asset for PitRadio. Defaults to ambient track. | `/media/ambient-pit.wav` |

> [!WARNING]
> On Vercel, the filesystem (`/public/posters/uploads/`) is ephemeral and read-only at runtime. `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (or an equivalent S3-compatible provider) must be configured so poster uploads persist across serverless function invocations.

---

## 3. Step-by-Step Vercel Deployment Instructions

### Step 1: Connect Repository to Vercel
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import the repository `ParthSonar-22/flux_Ecs`.
4. Set **Root Directory** to `website` (or `./` if deploying from the root workspace).
5. Framework Preset: **Next.js**.
6. Build Command: `npm run build` (default).
7. Output Directory: `.next` (default).
8. Install Command: `npm install` (default).

### Step 2: Configure Environment Variables
In the **Environment Variables** section of the setup screen, add all variables from the table above.

### Step 3: Configure MongoDB Atlas (Whitelist Vercel)
1. In [MongoDB Atlas](https://cloud.mongodb.com), go to **Network Access**.
2. Click **Add IP Address**.
3. Select **Allow Access From Anywhere** (`0.0.0.0/0`) since Vercel utilizes dynamic serverless IP ranges.
4. Verify that the database user has `readWrite` permissions on the `flux_ecs` database.

### Step 4: Configure Supabase Storage Bucket
1. In your [Supabase Dashboard](https://supabase.com), go to **Storage** -> **New Bucket**.
2. Name the bucket `media`.
3. Set bucket access to **Public** so uploaded posters and document attachments are publicly readable.
4. Set allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`, `application/pdf`.

### Step 5: Deploy
1. Click **Deploy**.
2. Review the build logs. Build should complete in ~10 seconds with 0 warnings or errors.
3. Once deployed, verify:
   - Homepage loads at `https://aarya-fluxecs.vercel.app`
   - PitRadio initializes without console errors
   - Events docket loads at `/events`
   - Admin login works at `/admin` with your configured `ADMIN_PASSWORD`
   - Poster uploads succeed and return public Supabase URLs

---

## 4. Verification Checkpoint Before Production Cutover

Execute these commands locally before merging to `main`:
```bash
npm run typecheck
npm run lint
npm run test
node scripts/verify-v2.mjs
node scripts/test-cms-e2e.mjs
npm run build
```
All commands must output zero errors.
