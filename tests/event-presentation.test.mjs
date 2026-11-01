import test from 'node:test'
import assert from 'node:assert/strict'
import {eventPhase, registrationState, safeLink, eventDate} from '../lib/event-presentation.js'
const event={starts_at:'2026-11-02T07:30:00Z',ends_at:'2026-11-03T10:00:00Z',registration_url:'https://example.com/register',registration_open_at:'2026-10-20T00:00:00Z',registration_close_at:'2026-11-01T18:29:59Z'}
test('event lifecycle is independent of stale stored status',()=>{assert.equal(eventPhase({...event,status:'past'},new Date('2026-11-01')),'upcoming');assert.equal(eventPhase(event,new Date('2026-11-02T08:00:00Z')),'ongoing');assert.equal(eventPhase(event,new Date('2026-11-04')),'past')})
test('closed and not-yet-open registrations are not actionable',()=>{assert.equal(registrationState(event,new Date('2026-10-19')).href,'');assert.equal(registrationState(event,new Date('2026-11-02')).href,'');assert.equal(registrationState(event,new Date('2026-10-30')).label,'Register now')})
test('unknown registration window is not called open',()=>assert.equal(registrationState({...event,registration_open_at:null,registration_close_at:null},new Date('2026-10-30')).label,'View registration form'))
test('links reject script/data and protocol relative URLs',()=>{for(const url of ['javascript:alert(1)','data:text/html,hello','//example.com','http://example.com'])assert.equal(safeLink(url),'');assert.equal(safeLink('https://example.com'),'https://example.com/')})
test('dates use India timezone and missing dates stay honest',()=>{assert.equal(eventDate(event),'2–3 November 2026');assert.equal(eventDate({}),'Date to be announced')})
