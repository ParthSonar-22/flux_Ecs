# Content model and publishing plan

Existing source of truth remains data/site.js, events.js, posts.js and team.js until database migration is approved and tested. Never fabricate project teams or results from a lab caption.

Planned entities: site_settings (affiliation, approved links, contact, hero/media references), home_sections (kind, order, featured record IDs), events (slug, title, dates with timezone, venue, rules, status, registration URL), event_assets (event ID, media ID, purpose), projects (slug, problem, hardware, software, architecture, process, GitHub and demo URL), project_members (project ID, council/person ID, contribution), stories (slug, safe rich content, excerpt, author ID, category ID), authors, categories, albums, album_images (caption, alt, credit, order), council_years, council_members (name, role, portrait, year, order), inquiries (minimal contact fields, handled state, retention expiry), profiles, roles, publish_history.

All publishable records need ID, slug uniqueness, created_at, updated_at, created_by, state and published_at. Workflow: draft, preview, in_review, scheduled or published, archived. Public queries see published records whose publication time has arrived. Editors can submit, publishers can publish, administrators manage roles. RLS enforces these rules, including storage. Service keys stay server-side. Store uploads by opaque IDs with MIME and size validation. Do not render unsanitized HTML. Preserve source credit and rights per media object.

Inquiries should expire after a council-approved retention period, proposed 180 days, with explicit deletion and CSV access limited to administrators. No database schema or RLS policy is claimed implemented in this milestone.
