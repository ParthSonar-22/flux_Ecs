// scripts/verify-v2.mjs
// Automated verification suite for FluxECS V2 Minimal Architecture & Events Platform

async function runVerification() {
  console.log('🧪 Starting FluxECS V2 Verification Suite...\n')
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

  // 1. Homepage & Core Routes Response
  try {
    const resHome = await fetch(`${baseUrl}/`)
    assert(resHome.status === 200, 'Homepage renders (200 OK)')
    const homeHtml = await resHome.text()
    assert(homeHtml.includes('FROM CIRCUITS'), 'Homepage contains headline "FROM CIRCUITS"')
    assert(!homeHtml.includes('FLUX CIRCUIT // VESIT RACE CONTROL'), 'Track map / telemetry completely eliminated')
    assert(!homeHtml.includes('BUILT TO LEARN'), 'Projects showcase section removed from homepage')
    assert(homeHtml.includes('01 / FEATURED EVENT'), 'Homepage has Featured Event section')
    assert(homeHtml.includes('02 / ABOUT FLUXECS'), 'Homepage has About the Council section')

    const resEvents = await fetch(`${baseUrl}/events`)
    assert(resEvents.status === 200, 'Events page renders (200 OK)')
    const eventsHtml = await resEvents.text()
    assert(eventsHtml.includes('Events'), 'Events page contains title')
    assert(eventsHtml.includes('Upcoming') && eventsHtml.includes('Past'), 'Events page has Upcoming and Past categories')

    const resDetail = await fetch(`${baseUrl}/events/algorithms-auction`)
    assert(resDetail.status === 200, 'Individual event page /events/algorithms-auction renders (200 OK)')
    const detailHtml = await resDetail.text()
    assert(detailHtml.includes("Algorithm&#x27;s Auction") || detailHtml.includes("Algorithm's Auction"), 'Individual event page shows title')
    assert(detailHtml.includes('Registration Open'), 'Individual event page shows real active registration state')
    assert(detailHtml.includes('https://docs.google.com/forms'), 'Individual event page contains verified registration URL')
  } catch (err) {
    console.error('Core routes failed:', err)
    failed++
  }

  // 2. Public API - Draft Visibility Restrictions
  try {
    const resPublicEvents = await fetch(`${baseUrl}/api/events`)
    const dataPublic = await resPublicEvents.json()
    assert(dataPublic.ok && Array.isArray(dataPublic.events), 'Public /api/events returns JSON array')
    assert(dataPublic.events.every((e) => e.is_published === true), 'Public /api/events ONLY returns published events')
  } catch (err) {
    console.error('Public API failed:', err)
    failed++
  }

  // 3. Admin Authentication & Session
  let adminCookie = ''
  try {
    const resWrongAuth = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'wrong-password' }),
    })
    assert(resWrongAuth.status === 401, 'Admin login rejects invalid password (401)')

    const resAuth = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: process.env.TEST_ADMIN_PASSWORD }),
    })
    assert(resAuth.status === 200, 'Admin login accepts valid password (200 OK)')
    const setCookie = resAuth.headers.get('set-cookie')
    assert(setCookie && setCookie.includes('flux_admin_token'), 'Admin login sets HTTP-only flux_admin_token session cookie')
    adminCookie = setCookie.split(';')[0]
  } catch (err) {
    console.error('Admin Auth failed:', err)
    failed++
  }

  // 4. Admin Poster File Upload
  let uploadedPosterUrl = ''
  try {
    // Generate a minimal 1x1 test PNG buffer
    const testPngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    )
    const formData = new FormData()
    const blob = new Blob([testPngBuffer], { type: 'image/png' })
    formData.append('file', blob, 'test-graphics-poster.png')

    const resUpload = await fetch(`${baseUrl}/api/admin/upload`, {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: formData,
    })
    const uploadData = await resUpload.json()
    assert(uploadData.ok && uploadData.url.startsWith('/posters/uploads/'), 'Admin poster file upload succeeds and returns valid public path')
    uploadedPosterUrl = uploadData.url
  } catch (err) {
    console.error('Poster upload failed:', err)
    failed++
  }

  // 5. Create Draft Event & Verify Hidden from Public
  const draftSlug = `test-hackathon-${Date.now()}`
  try {
    const resCreateDraft = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        slug: draftSlug,
        title: 'VESIT Micro-Hackathon 2026',
        category: 'Hackathon',
        date: 'December 10, 2026',
        venue: 'Lab 201, VESIT',
        description: 'Internal prototyping sprint for ECS students.',
        poster_url: uploadedPosterUrl,
        status: 'upcoming',
        is_published: false, // DRAFT!
      }),
    })
    const createData = await resCreateDraft.json()
    assert(createData.ok && createData.event.slug === draftSlug, 'Admin can create draft event')

    // Verify draft is hidden from public API
    const resCheckPublic = await fetch(`${baseUrl}/api/events`)
    const checkPublicData = await resCheckPublic.json()
    const foundInPublic = checkPublicData.events.some((e) => e.slug === draftSlug)
    assert(!foundInPublic, 'Draft event is strictly HIDDEN from public visitors')

    // Verify draft is visible to admin with ?all=true
    const resCheckAdmin = await fetch(`${baseUrl}/api/events?all=true`, {
      headers: { Cookie: adminCookie },
    })
    const checkAdminData = await resCheckAdmin.json()
    const foundInAdmin = checkAdminData.events.some((e) => e.slug === draftSlug)
    assert(foundInAdmin, 'Draft event IS visible in admin console')
  } catch (err) {
    console.error('Draft event test failed:', err)
    failed++
  }

  // 6. Publish Event & Verify It Becomes Public
  try {
    const resPublish = await fetch(`${baseUrl}/api/events/${draftSlug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({ is_published: true }),
    })
    const pubData = await resPublish.json()
    assert(pubData.ok && pubData.event.is_published === true, 'Admin can publish draft event')

    // Verify it is now live publicly
    const resCheckLive = await fetch(`${baseUrl}/api/events`)
    const checkLiveData = await resCheckLive.json()
    const isNowPublic = checkLiveData.events.some((e) => e.slug === draftSlug)
    assert(isNowPublic, 'Published event is now immediately live for public visitors')
  } catch (err) {
    console.error('Publish test failed:', err)
    failed++
  }

  // 7. Delete Test Event & Clean Up
  try {
    const resDelete = await fetch(`${baseUrl}/api/events/${draftSlug}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookie },
    })
    const delData = await resDelete.json()
    assert(delData.ok, 'Admin can delete event from docket')

    const resCheckGone = await fetch(`${baseUrl}/api/events`)
    const checkGoneData = await resCheckGone.json()
    const isGone = !checkGoneData.events.some((e) => e.slug === draftSlug)
    assert(isGone, 'Deleted event is removed from public docket')
  } catch (err) {
    console.error('Delete test failed:', err)
    failed++
  }

  console.log(`\n📊 Verification Complete: ${passed} Passed, ${failed} Failed\n`)
  if (failed > 0) process.exit(1)
}

runVerification()
