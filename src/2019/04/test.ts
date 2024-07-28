import assert from 'node:assert'
import test from 'node:test'
import { findPasswords, isValidPassword } from './'

test('Day 04 — Sample', () => {
  assert.ok(isValidPassword('111111'))
  assert.equal(isValidPassword('223450'), false)
  assert.equal(isValidPassword('123789'), false)
  assert.ok(isValidPassword('111122', true))
  assert.ok(isValidPassword('112222', true))
  assert.ok(isValidPassword('112233', true))
  assert.equal(isValidPassword('123789', true), false)
})

test('Day 04 — Solutions', () => {
  const input = '272091-815432'

  assert.strictEqual(findPasswords(input).length, 931)
  assert.strictEqual(findPasswords(input, true).length, 609)
})
