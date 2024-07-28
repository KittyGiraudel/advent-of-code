import assert from 'node:assert'
import test from 'node:test'
import { isValid, run } from './'

test('Day 11 — Sample', () => {
  assert.strictEqual(isValid('hijklmmn'), false)
  assert.strictEqual(isValid('abbceffg'), false)
  assert.strictEqual(isValid('abcdffaa'), true)
  assert.strictEqual(isValid('ghjaabcc'), true)
  assert.strictEqual(run('ghijklmn'), 'ghjaabcc')
})

test('Day 11 — Solutions', () => {
  assert.strictEqual(run('vzbxkghb'), 'vzbxxyzz')
  assert.strictEqual(run('vzbxxyzz'), 'vzcaabcc')
})
