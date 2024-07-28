import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { validate, validateStrict } from './'

test('Day 04 — Sample', () => {
  assert.strictEqual(validate('aa bb cc dd ee'), true)
  assert.strictEqual(validate('aa bb cc dd aa'), false)
  assert.strictEqual(validate('aa bb cc dd aaa'), true)
  assert.strictEqual(validateStrict('abcde fghij'), true)
  assert.strictEqual(validateStrict('abcde xyz ecdab'), false)
  assert.strictEqual(validateStrict('a ab abc abd abf abj'), true)
  assert.strictEqual(validateStrict('iiii oiii ooii oooi oooo'), true)
  assert.strictEqual(validateStrict('oiii ioii iioi iiio'), false)
})

test('Day 04 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(input.filter(validate).length, 383)
  assert.strictEqual(input.filter(validateStrict).length, 265)
})
