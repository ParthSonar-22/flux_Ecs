# FluxECS Council Secretariat — Content Management Guide

Welcome to the **FluxECS Secretariat Admin Portal**. This system empowers council members to update website copy, publish events, upload official posters, release technical guides, and manage council profiles without touching a single line of code.

---

## 1. Accessing the Secretariat Console

1. Navigate to: `https://aarya-fluxecs.vercel.app/admin` (or `http://localhost:3000/admin` locally).
2. **Super Admin Login:** Leave the email field blank and enter the master **Council Authorization Key**.
3. **Individual Admin Login:** Enter your registered institutional email (e.g., `editor@ves.ac.in`) and the authorization key.
4. Click **Authorize Terminal**.
5. Once authenticated, your active session badge (e.g. `SUPER ADMIN: buildwithaarya@gmail.com`) appears at the top right alongside the **Log Out** button.

---

## 2. Managing Events & Posters

Click the **Events Docket & Posters** tab (🎟️):

### Creating a New Event
1. Fill in the **Event Title** (e.g., `Algorithm's Auction 3.0`).
2. Enter the **Date** (e.g., `November 15, 2026`) and **Time** (e.g., `1:00 PM – 4:00 PM IST`).
3. Set the **Venue** (e.g., `Lab 201, 2nd Floor, VESIT`).
4. Select the **Category** (`Workshop`, `Hackathon`, `Auction`, `Webinar`).
5. Upload the **Official Poster Artwork**:
   - Click **Browse** or drop a 3:4 aspect ratio image (`JPG`, `PNG`, `WEBP`).
   - The system displays a live 3:4 preview card immediately upon upload.
6. Enter the **Registration URL** (Google Form or Unstop link).
7. Outline the **Eligibility**, **Syllabus / Curriculum**, and **Rules** (one per line).
8. Toggle **Publish / Draft**:
   - Check **Published** if ready for the public calendar.
   - Leave unchecked to save as an internal draft.
9. Click **Save Event to Docket**.

### Editing or Deleting Events
- **Edit:** Click **Edit** on any existing event card in the docket to load all its fields into the form. Make your updates and click **Update Event**.
- **1-Click Status Toggle:** Click **Publish** or **Unpublish** directly on the card.
- **Delete:** Click **Delete** to permanently remove an archived event.

---

## 3. Website CMS & Live Split-Screen Preview

Click the **Edit Panel (Notion Style)** tab (✍️):

The interface provides a dual-column workspace:
- **Left Column:** Live editing form tabs.
- **Right Column:** Real-time website preview iframe with viewport switchers:
  - 💻 **Desktop (100%)**
  - 📱 **Tablet (768px)**
  - 📱 **Mobile (375px)**
  - Path selector dropdown to switch between `/`, `/events`, `/blog`, `/resources`, `/about`, and `/contact`.

### A. Hero Slideshow (🎞️)
- **Active Slides:** See all currently active photography frames with preview thumbnails and numbering (`#1`, `#2`, etc.).
- **Reordering:** Click **↑** or **↓** to adjust slide rotation sequence.
- **Toggle Visibility:** Click **Active** / **Hidden** to temporarily disable a photo without deleting it.
- **Replacing Imagery:** Select any authentic lab photo from the dropdown or paste an uploaded image URL.
- **Add / Remove:** Click **+ Add Slide** to introduce a new frame or **✕** to delete.

### B. Homepage Hero Copy (🏎️)
- Edit **Headline Line 1** (e.g. `From circuits`) and **Headline Line 2** (e.g. `to code.`).
- Update **Department Overline** and **School / Location**.
- Update the **Supporting Lead Paragraph**.
- Modify button labels and destination links.

### C. Council & Faculty Rosters (👥)
- **Faculty Leadership:** Add or edit faculty coordinators (Prof. Yogesh Pandit, Prof. Abhishek Chaudhari). If a photograph is absent, the system automatically displays their 2-letter uppercase initials (`YP`, `AC`) in an official portrait-sized frame.
- **Senior Council:** Manage third/final-year executive council members (President, Vice-President, Technical Leads, Operations).
- **Junior Council:** Manage second-year associates.
- **Cohort Group Photo:** Update the full team laboratory photograph displayed on the About page.

### D. About Page Content (📜)
- Edit the editorial headline, introduction narrative, and core technical pillars (Hardware Prototyping, Competitive Algorithms, Peer Mentorship).

### E. Social Links & Website Settings (⚙️)
- Update official contact email (`flux.ecs@ves.ac.in`).
- Configure official social links:
  - **Instagram:** `https://www.instagram.com/flux.ecs/`
  - **LinkedIn:** `https://in.linkedin.com/company/tinkerers-lab-ecs`
  - **GitHub:** `https://github.com/Flux-ECS-Club`
- Control the retro arcade game toggle.

### Saving & Publishing Site Content
Once you have made your changes and inspected the live preview, click **Publish Changes →** in the top action toolbar. The changes immediately synchronize to the database and go live on the public website.

---

## 4. Technical Blog & Guides (✍️)

1. Select the **Blogs & Guides** tab.
2. Click **+ New Technical Article**.
3. Fill in:
   - **Title** and **Slug** (URL path).
   - **Summary** (brief overview for the card).
   - **Category** (`Embedded`, `Algorithms`, `Hardware`, `Web`, `Tutorial`).
   - **Markdown Content:** Use Markdown for headings (`#`, `##`), bullet points, tables, and fenced code blocks with language indicators (e.g. ` ```rust ` or ` ```python `).
   - **Attachments:** Add downloadable PDF links or datasheets.
   - **Status:** Set to `Draft` for peer review or `Published` for public distribution.
4. Click **Publish Article**.

---

## 5. Engineering Resource Library (📦)

1. Select the **Resources** tab.
2. Enter the resource **Title**, **Description**, **Category**, and **Download URL**.
3. Click **Add Resource**. The item becomes immediately searchable and downloadable on `/resources`.

---

## 6. Multi-User Admin & Role Management (🛡️)

Only the **Super Admin** (`buildwithaarya@gmail.com`) can invite new council administrators.

1. Select the **Council Admins & Auth** tab.
2. Enter the new member's **Institutional Email** and **Full Name**.
3. Select their designated **Role**:
   - **Admin / Publisher:** Full editorial access; can approve and publish live changes, delete records, and manage all content.
   - **Editor:** Can create and edit drafts for events, blogs, and resources; restricted from live publishing, deletions, and user management.
   - **Graphics / Media Editor:** Dedicated permissions to upload and manage posters and media assets.
4. Click **Invite Council Member**.
5. To revoke permissions, click **Revoke Access** on their user row.
