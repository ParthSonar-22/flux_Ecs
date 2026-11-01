import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { pathToFileURL } from 'node:url'

const moduleUrl = pathToFileURL(
  new URL('../lib/auth.js', import.meta.url).pathname,
)
test('unconfigured admin fails closed, including the old fallback token', async () => {
  delete process.env.ADMIN_PASSWORD
  delete process.env.ADMIN_SECRET
  const auth = await import(`${moduleUrl}?missing`)
  assert.equal(auth.verifyAdminToken('anything'), false)
  assert.throws(() => auth.generateAdminToken(), /ADMIN_SECRET/)
})
test('configured admin accepts its signed token and rejects tampering', async () => {
  process.env.ADMIN_SECRET = randomBytes(32).toString('hex')
  process.env.ADMIN_PASSWORD = randomBytes(32).toString('hex')
  const auth = await import(`${moduleUrl}?configured`)
  const token = auth.generateAdminToken()
  assert.equal(auth.verifyAdminToken(token), true)
  assert.equal(auth.verifyAdminToken(token.slice(1)), false)
  assert.equal(
    auth.verifyAdminToken(
      `${token.slice(0, -1)}${token.endsWith('0') ? '1' : '0'}`,
    ),
    false,
  )
  delete process.env.ADMIN_PASSWORD
  assert.equal(auth.verifyAdminToken(token), false)
  delete process.env.ADMIN_SECRET
})
