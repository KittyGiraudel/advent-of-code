import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { isValidLoose, isValidStrict } from './'

test('Day 02 — Sample', () => {
  assert.strictEqual(isValidLoose('1-3 a: abcde'), true)
  assert.strictEqual(isValidLoose('1-3 b: cdefg'), false)
  assert.strictEqual(isValidLoose('2-9 c: ccccccccc'), true)
  assert.strictEqual(isValidStrict('1-3 a: abcde'), true)
  assert.strictEqual(isValidStrict('1-3 b: cdefg'), false)
  assert.strictEqual(isValidStrict('2-9 c: ccccccccc'), false)
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(input.filter(isValidLoose).length, 500)
  assert.strictEqual(input.filter(isValidStrict).length, 313)
})
