# FLUXECS V2 — COUNCIL ADMINISTRATOR GUIDE

Welcome to the FluxECS Secretariat Management System. This manual explains how any council member, regardless of programming experience, can maintain the website, publish events, upload artwork, post technical writeups, and manage council profiles without touching code.

---

## 1. Accessing the Admin Console

1. Navigate to: `https://aarya-fluxecs.vercel.app/admin` (or `http://localhost:3000/admin` locally).
2. Enter the council administrative key or password.
3. Upon authentication, you will be redirected to the Secretariat Dashboard with your session active for 7 days.
4. To log out safely, click **Logout** or clear your browser session cookies.

---

## 2. Admin Roles & Permissions

The platform supports four distinct administrative roles:

1. **Super Admin (`super_admin`):**
   - Full access to all controls.
   - Only role that can invite or revoke administrator accounts.
   - Root account: `buildwithaarya@gmail.com`.
2. **Admin / Publisher (`admin`):**
   - Can publish events, update live homepage content, and delete items.
3. **Editor (`editor`):**
   - Can write and edit articles, prepare new events, and save drafts.
   - Cannot publish directly to the live website without approval.
4. **Media Editor (`media_editor`):**
   - Can upload and replace official event posters, photography, and resource documents.

---

## 3. Managing the Homepage

In the admin dashboard, select the **Edit Panel** tab:

### Editing Hero Text
1. Click **Hero Text 🏎️**.
2. Modify Headline Line 1, Headline Line 2, Department Overline, or Lead Narrative.
3. Observe your changes instantly in the **Live Preview** on the right side of the screen.
4. Click **Save Changes** in the top toolbar to publish live.

### Hero Slideshow Manager
1. Click **Hero Slideshow 🎞️**.
2. **Reorder Slides:** Use the `↑` and `↓` buttons to move frames earlier or later.
3. **Toggle Active/Hidden:** Click the status pill to hide a slide without deleting it.
4. **Change Image:** Select an existing photo from the dropdown or paste a new URL.
5. **Add New Slide:** Click **+ Add Slide**, enter title and caption.
6. Click **Save Changes** to publish to the live site.

---

## 4. Managing Events & Posters

In the admin dashboard, select the **Events Docket & Posters** tab:

### Creating a New Event
1. Fill in the event creation form:
   - **Event Title:** e.g., `Algorithms Auction 2026`.
   - **Slug:** Auto-generated URL slug (e.g., `algorithms-auction-2026`).
   - **Category:** Select from Competitive Coding, Hardware Exhibition, Workshop, etc.
   - **Date & Time:** e.g., `02 - 03 November 2026`, `10:00 AM - 05:00 PM`.
   - **Venue:** e.g., `Lab 201, VESIT, Mumbai`.
   - **Summary:** Short one-line summary for event cards.
   - **Full Description:** Detailed overview of the event.
   - **Registration URL:** Direct link to Google Form or portal.
   - **Rules & Syllabus:** Add rules separated by line breaks.
2. **Upload Poster:**
   - Click the file picker under **Poster Artwork File**.
   - Select your JPG, PNG, or WEBP file (max 15MB).
   - Once uploaded, the poster preview appears automatically.
3. **Draft vs. Published:**
   - Leave **Publish Immediately** unchecked to save as a draft for council review.
   - Check **Publish Immediately** to make it accessible to public visitors.
4. Click **Create Event**.

### Editing or Deleting Events
- In the active events table, click **Edit** to modify details or swap the poster.
- Click **Delete** to remove past or canceled events.

---

## 5. Publishing Technical Articles & Tutorials

In the **Edit Panel**, select the **Blogs & Guides ✍️** tab:

1. Click **+ New Article**.
2. Fill in:
   - **Title:** e.g., `STM32 Firmware Engineering Guide`.
   - **Category:** Embedded, Algorithms, Web Development, Robotics.
   - **Summary:** Short excerpt for the blog index card.
   - **Read Time:** e.g., `6 min read`.
   - **Author Name & Role:** e.g., `Aarya Tanwade (Technical Head)`.
   - **Cover Image:** Select an uploaded photo.
3. **Rich Article Content:**
   - Supports Markdown formatting, headers (`###`), lists, and code blocks:
     ```c
     void setup() {
       Serial.begin(115200);
     }
     ```
4. **Attachments:** Attach downloadable project PDFs or GitHub links.
5. Set status to **Published** and click **Publish Article**.

---

## 6. Managing Resources & Downloads

In the **Edit Panel**, select the **Resources 📦** tab:

1. Under **Add New Resource**, enter:
   - **Title:** e.g., `ESP32 FreeRTOS Reference Manual`.
   - **Category:** Embedded, Algorithms, or Core ECS.
   - **File Type:** PDF, ZIP, Repository Link.
   - **Download URL:** Paste the file URL or GitHub repository address.
   - **Size:** e.g., `2.4 MB`.
2. Click **+ Add Resource**.

---

## 7. Managing Faculty & Council Rosters

In the **Edit Panel**, select the **The Council 👥** tab:

### Faculty In-Charge
- Update faculty member names, titles, and department descriptions.
- To upload a new portrait, upload the image via the Media Uploader and paste the path in **Photo URL**.
- If a portrait is pending, leave the field empty—the About page will automatically render a neat portrait-sized box with their initials (e.g. `YP` for Yogesh Pandit, `AC` for Abhishek Chaudhari).

### Senior & Junior Council Officers
- Edit officer names, positions, quotes, and photo paths.
- Click **+ Add Senior Officer** or **+ Add Junior Officer** when inducting new council members.
- Click `✕` to remove outgoing members upon term completion.
- Click **Save Changes** in the top toolbar to publish live to the About page.

---

## 8. Live Side-by-Side Preview

The Edit Panel features a live preview column:
- Click the **Desktop 💻**, **Tablet 📱**, or **Mobile 📲** icons to test responsiveness.
- Use the route switcher to preview the **Homepage**, **Events**, **About**, or **Blog** pages before saving.
- Preview changes are reflected immediately in the preview frame without affecting what public visitors see until you click **Save Changes**.

---

## 9. Council Administrators & Access Control

Super Admins can manage team access under the **Council Admins & Auth 🛡️** tab:
1. Enter the new officer's email address and name.
2. Select their role (`Admin`, `Editor`, or `Media Editor`).
3. Click **+ Add Admin**.
4. To revoke access when a member completes their tenure, click **Revoke**. Root Super Admin access cannot be removed.
