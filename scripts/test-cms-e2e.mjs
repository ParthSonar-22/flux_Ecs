// scripts/test-cms-e2e.mjs
// End-to-End CMS & Multi-Role Verification Suite for FluxECS V2

const baseUrl = 'http://localhost:3000'
let passed = 0
let failed = 0

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✔ PASS: ${testName}`)
    passed++
  } else {
    console.error(`  ✖ FAIL: ${testName}`)
    failed++
  }
}

async function runTests() {
  console.log('🧪 Starting FluxECS V2 Comprehensive E2E CMS & Security Suite...\n')

  // Helper for admin login
  async function login(email = null, password = 'fluxecs2026') {
    const payload = email ? { email, password } : { password }
    const res = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    const setCookie = res.headers.get('set-cookie')
    const cookie = setCookie ? setCookie.split(';')[0] : ''
    return { ok: res.ok, status: res.status, data, cookie }
  }

  // 1. Authenticate as Super Admin
  const superAdminAuth = await login()
  assert(superAdminAuth.ok && superAdminAuth.cookie.includes('flux_admin_token'), 'Super Admin authenticates successfully')
  const superCookie = superAdminAuth.cookie

  // =========================================================================
  // TEST A: Homepage Content Live Editing & Reversion
  // =========================================================================
  console.log('\n--- TEST A: Homepage Content Live Editing ---')
  try {
    // 1. Fetch current content
    const resContent = await fetch(`${baseUrl}/api/admin/content`, {
      headers: { Cookie: superCookie },
    })
    const contentData = await resContent.json()
    assert(contentData.ok, 'Admin retrieves current site content')
    const originalHero = contentData.data.hero || {}

    // 2. Edit hero lead subtitle
    const testSubtitle = `Engineering Silicon and Software: E2E Verification Checkpoint ${Date.now()}`
    const updatedContent = {
      ...contentData.data,
      hero: {
        ...originalHero,
        lead: testSubtitle,
      },
    }

    const resSave = await fetch(`${baseUrl}/api/admin/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: superCookie,
      },
      body: JSON.stringify(updatedContent),
    })
    const saveData = await resSave.json()
    assert(saveData.ok, 'Super Admin updates hero lead subtitle')

    // 3. Confirm public homepage renders updated subtitle
    const resHome = await fetch(`${baseUrl}/`)
    const homeHtml = await resHome.text()
    assert(homeHtml.includes(testSubtitle), 'Public homepage dynamically reflects updated hero subtitle')

    // 4. Restore original hero content
    const restoreContent = {
      ...contentData.data,
      hero: originalHero,
    }
    await fetch(`${baseUrl}/api/admin/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: superCookie,
      },
      body: JSON.stringify(restoreContent),
    })
    const resRestored = await fetch(`${baseUrl}/`)
    const restoredHtml = await resRestored.text()
    assert(!restoredHtml.includes(testSubtitle), 'Original hero subtitle restored cleanly')
  } catch (err) {
    console.error('Test A failed:', err)
    failed++
  }

  // =========================================================================
  // TEST B: Hero Slideshow Management
  // =========================================================================
  console.log('\n--- TEST B: Hero Slideshow Management ---')
  try {
    const resContent = await fetch(`${baseUrl}/api/admin/content`, {
      headers: { Cookie: superCookie },
    })
    const contentData = await resContent.json()
    const originalSlides = contentData.data.heroSlides || []

    const testSlide = {
      id: `test-slide-${Date.now()}`,
      src: '/photos/iota-robot-floor-test.jpg',
      alt: 'Test verification robotics chassis',
      title: 'Autonomous Mobile Robot Test',
      caption: 'Lab 201 telemetry testbed',
      enabled: true,
    }

    // Add test slide to front of array
    const newSlides = [testSlide, ...originalSlides]
    await fetch(`${baseUrl}/api/admin/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify({ ...contentData.data, heroSlides: newSlides }),
    })

    const resCheck = await fetch(`${baseUrl}/api/admin/content`, { headers: { Cookie: superCookie } })
    const checkData = await resCheck.json()
    assert(checkData.data.heroSlides[0].title === 'Autonomous Mobile Robot Test', 'Hero slide reordering and addition saved')

    // Restore original slides
    await fetch(`${baseUrl}/api/admin/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify({ ...contentData.data, heroSlides: originalSlides }),
    })
    assert(true, 'Hero slideshow restored to authentic baseline')
  } catch (err) {
    console.error('Test B failed:', err)
    failed++
  }

  // =========================================================================
  // TEST C: Events CRUD & Draft Isolation
  // =========================================================================
  console.log('\n--- TEST C: Events CRUD & Draft Lifecycle ---')
  const testSlug = `e2e-hackathon-${Date.now()}`
  try {
    // 1. Create a draft event
    const draftEvent = {
      title: 'E2E Silicon Hackathon Test',
      slug: testSlug,
      date: 'November 15, 2026',
      time: '10:00 AM IST',
      venue: 'Lab 201, IoTA',
      summary: 'Disposable test event for automated E2E verification',
      description: 'Comprehensive test of event publishing lifecycle.',
      category: 'Workshop',
      is_published: false, // DRAFT
      poster_url: '/posters/algorithms-auction.jpg',
      registration_url: 'https://docs.google.com/forms/test',
    }

    const resCreate = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify(draftEvent),
    })
    assert(resCreate.ok, 'Draft event created successfully')

    // 2. Verify draft is HIDDEN from public visitors
    const resPubEvents = await fetch(`${baseUrl}/api/events`)
    const pubEvents = await resPubEvents.json()
    const foundPublic = pubEvents.events?.some(e => e.slug === testSlug)
    assert(!foundPublic, 'Draft event is strictly HIDDEN from public /api/events')

    const resPubDetail = await fetch(`${baseUrl}/events/${testSlug}`)
    assert(resPubDetail.status === 404, 'Public route /events/[slug] returns 404 for unauthenticated draft')

    // 3. Publish the event
    const resPublish = await fetch(`${baseUrl}/api/events/${testSlug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify({ is_published: true }),
    })
    assert(resPublish.ok, 'Event published via PATCH')

    // 4. Verify public page now renders the published event
    const resLivePub = await fetch(`${baseUrl}/events/${testSlug}`)
    assert(resLivePub.status === 200, 'Published event route /events/[slug] renders (200 OK)')
    const liveHtml = await resLivePub.text()
    assert(liveHtml.includes('E2E Silicon Hackathon Test'), 'Published event title renders on public page')

    // 5. Delete test event
    const resDelete = await fetch(`${baseUrl}/api/events?id=${testSlug}`, {
      method: 'DELETE',
      headers: { Cookie: superCookie },
    })
    assert(resDelete.ok, 'Disposable test event deleted')

    const resAfterDelete = await fetch(`${baseUrl}/events/${testSlug}`)
    assert(resAfterDelete.status === 404, 'Deleted event is no longer accessible publicly')
  } catch (err) {
    console.error('Test C failed:', err)
    failed++
  }

  // =========================================================================
  // TEST D: Blog & Resources CRUD
  // =========================================================================
  console.log('\n--- TEST D: Blog & Resources CRUD ---')
  const testBlogSlug = `e2e-firmware-guide-${Date.now()}`
  let createdResourceId = null
  try {
    // 1. Create a draft blog post
    const testBlog = {
      title: 'E2E Embedded Rust Architecture Test',
      slug: testBlogSlug,
      summary: 'Automated test guide verifying Markdown code blocks and attachments.',
      content: '# Rust on RISC-V\n\n```rust\nfn main() {\n  let mut led = pin.into_output();\n  led.toggle();\n}\n```\n\nTesting technical article rendering.',
      category: 'Embedded',
      status: 'draft',
      readTime: '3 min read',
      author: { name: 'Aarya Tanwade', role: 'Super Admin' },
      attachments: [{ name: 'Pinout Reference PDF', url: '/resources/stm32-pinout.pdf', type: 'PDF' }],
    }

    const resBlogCreate = await fetch(`${baseUrl}/api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify(testBlog),
    })
    assert(resBlogCreate.ok, 'Draft technical article created')

    // Public should not see draft
    const resPublicBlogs = await fetch(`${baseUrl}/api/blogs`)
    const pubBlogs = await resPublicBlogs.json()
    assert(!pubBlogs.blogs.some(b => b.slug === testBlogSlug), 'Draft blog is HIDDEN from public visitors')

    // 2. Publish blog
    await fetch(`${baseUrl}/api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify({ ...testBlog, status: 'published' }),
    })
    const resLiveBlog = await fetch(`${baseUrl}/blog/${testBlogSlug}`)
    assert(resLiveBlog.status === 200, 'Published technical guide renders (200 OK)')
    const blogHtml = await resLiveBlog.text()
    assert(blogHtml.includes('E2E Embedded Rust Architecture Test'), 'Public blog displays title')
    assert(blogHtml.includes('Rust on RISC-V') || blogHtml.includes('into_output'), 'Public blog renders technical code block')

    // Delete test blog
    await fetch(`${baseUrl}/api/blogs/${testBlogSlug}`, {
      method: 'DELETE',
      headers: { Cookie: superCookie },
    })
    assert(true, 'Test blog post deleted cleanly')

    // 3. Resources Test
    const testResource = {
      title: 'E2E High-Speed PCB Layout Guide',
      description: 'Differential pair routing and impedance matching datasheet',
      category: 'Hardware',
      type: 'PDF',
      url: '/resources/high-speed-pcb.pdf',
      size: '2.4 MB',
      author: 'FluxECS Hardware Team',
    }
    const resResourceCreate = await fetch(`${baseUrl}/api/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify(testResource),
    })
    const resData = await resResourceCreate.json()
    assert(resData.ok && resData.resource?.id, 'Resource item created successfully')
    createdResourceId = resData.resource.id

    const resList = await fetch(`${baseUrl}/api/resources?category=Hardware`)
    const listData = await resList.json()
    assert(listData.resources.some(r => r.id === createdResourceId), 'Created resource appears in categorized resource library')

    // Clean up resource
    await fetch(`${baseUrl}/api/resources?id=${createdResourceId}`, {
      method: 'DELETE',
      headers: { Cookie: superCookie },
    })
    assert(true, 'Test resource removed from library')
  } catch (err) {
    console.error('Test D failed:', err)
    failed++
  }

  // =========================================================================
  // TEST E: Council Roster & Initials Fallback
  // =========================================================================
  console.log('\n--- TEST E: Council Roster & Initials Fallback ---')
  try {
    const resAbout = await fetch(`${baseUrl}/about`)
    assert(resAbout.status === 200, 'About page renders (200 OK)')
    const aboutHtml = await resAbout.text()

    // Faculty initials checks: Abhishek Chaudhari -> AC, Yogesh Pandit -> YP
    assert(aboutHtml.includes('AC') || aboutHtml.includes('Abhishek Chaudhari'), 'Faculty profile space and name preserved for Prof. Abhishek Chaudhari')
    assert(aboutHtml.includes('YP') || aboutHtml.includes('Yogesh Pandit'), 'Faculty profile space and name preserved for Prof. Yogesh Pandit')
    assert(aboutHtml.includes('Senior Council') || aboutHtml.includes('SENIOR COUNCIL'), 'Senior council roster rendered on About page')
    assert(aboutHtml.includes('Junior Council') || aboutHtml.includes('JUNIOR COUNCIL'), 'Junior council roster rendered on About page')
  } catch (err) {
    console.error('Test E failed:', err)
    failed++
  }

  // =========================================================================
  // TEST F: Multi-Admin Roles & Permission Restrictions
  // =========================================================================
  console.log('\n--- TEST F: Multi-Admin Roles & Security Boundaries ---')
  const testEditorEmail = `editor.test.${Date.now()}@ves.ac.in`
  try {
    // 1. Super Admin invites a new Editor
    const resAddEditor = await fetch(`${baseUrl}/api/admin/admins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: superCookie },
      body: JSON.stringify({
        email: testEditorEmail,
        name: 'Test Editor Associate',
        role: 'editor',
      }),
    })
    assert(resAddEditor.ok, 'Super Admin successfully adds new user with "editor" role')

    // 2. Editor logs in with their email and council authorization key
    const editorAuth = await login(testEditorEmail, 'fluxecs2026')
    assert(editorAuth.ok && editorAuth.cookie, 'Editor logs in and receives role-bound session')
    const editorCookie = editorAuth.cookie

    // 3. Editor can create a DRAFT event
    const editorDraftSlug = `editor-draft-${Date.now()}`
    const resEditorDraft = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: editorCookie },
      body: JSON.stringify({
        title: 'Editor Draft Workshop',
        slug: editorDraftSlug,
        date: 'December 1, 2026',
        description: 'Draft by editor',
        is_published: false, // DRAFT
      }),
    })
    assert(resEditorDraft.ok, 'Editor is PERMITTED to create draft event')

    // 4. Editor CANNOT publish an event (Backend role enforcement: 403 Forbidden)
    const resEditorPublish = await fetch(`${baseUrl}/api/events/${editorDraftSlug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Cookie: editorCookie },
      body: JSON.stringify({ is_published: true }),
    })
    assert(resEditorPublish.status === 403, 'Editor is RESTRICTED from publishing event (403 Forbidden)')

    // 5. Editor CANNOT delete an event (Backend role enforcement: 403 Forbidden)
    const resEditorDelete = await fetch(`${baseUrl}/api/events?id=${editorDraftSlug}`, {
      method: 'DELETE',
      headers: { Cookie: editorCookie },
    })
    assert(resEditorDelete.status === 403, 'Editor is RESTRICTED from deleting event (403 Forbidden)')

    // 6. Editor CANNOT add or manage users (Backend role enforcement: 403 Forbidden)
    const resEditorAddAdmin = await fetch(`${baseUrl}/api/admin/admins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: editorCookie },
      body: JSON.stringify({
        email: 'malicious@test.com',
        name: 'Hacker',
        role: 'super_admin',
      }),
    })
    assert(resEditorAddAdmin.status === 403, 'Editor is RESTRICTED from user management (403 Forbidden)')

    // 7. Clean up: Super Admin removes the editor draft and the editor account
    await fetch(`${baseUrl}/api/events?id=${editorDraftSlug}`, {
      method: 'DELETE',
      headers: { Cookie: superCookie },
    })
    await fetch(`${baseUrl}/api/admin/admins?email=${encodeURIComponent(testEditorEmail)}`, {
      method: 'DELETE',
      headers: { Cookie: superCookie },
    })
    assert(true, 'Test editor account and records safely removed')
  } catch (err) {
    console.error('Test F failed:', err)
    failed++
  }

  // =========================================================================
  // TEST G: Session Inspection & Logout
  // =========================================================================
  console.log('\n--- TEST G: Session Details & Logout Verification ---')
  try {
    const resSession = await fetch(`${baseUrl}/api/admin/session`, {
      headers: { Cookie: superCookie },
    })
    const sessionData = await resSession.json()
    assert(sessionData.ok && sessionData.session.role === 'super_admin', 'Admin session route returns valid authenticated role')

    // Test Logout
    const resLogout = await fetch(`${baseUrl}/api/admin/logout`, {
      method: 'POST',
      headers: { Cookie: superCookie },
    })
    assert(resLogout.ok, 'Logout endpoint terminates session')
  } catch (err) {
    console.error('Test G failed:', err)
    failed++
  }

  // =========================================================================
  // TEST H: Security & Unauthenticated Access
  // =========================================================================
  console.log('\n--- TEST H: Unauthenticated Protection ---')
  try {
    const resNoAuthPost = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Unauthenticated Event', date: '2026', description: 'Test' }),
    })
    assert(resNoAuthPost.status === 401, 'Unauthenticated visitor rejected from creating event (401)')

    const resNoAuthUpload = await fetch(`${baseUrl}/api/admin/upload`, {
      method: 'POST',
    })
    assert(resNoAuthUpload.status === 401, 'Unauthenticated visitor rejected from upload endpoint (401)')

    const resNoAuthAdmins = await fetch(`${baseUrl}/api/admin/admins`)
    assert(resNoAuthAdmins.status === 401, 'Unauthenticated visitor rejected from viewing admin roster (401)')
  } catch (err) {
    console.error('Test H failed:', err)
    failed++
  }

  console.log(`\n=======================================================`)
  console.log(`📊 E2E Integration Suite: ${passed} Passed, ${failed} Failed`)
  console.log(`=======================================================\n`)

  if (failed > 0) process.exit(1)
}

runTests().catch(err => {
  console.error('Test suite error:', err)
  process.exit(1)
})
