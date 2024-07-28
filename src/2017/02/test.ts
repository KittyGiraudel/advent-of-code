import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { checksum } from './'

test('Day 02 — Sample', () => {
  const sampleA = $.sample(`
  5 1 9 5
  7 5 3
  2 4 6 8
  `)

  const sampleB = $.sample(`
  5 9 2 8
  9 4 7 3
  3 8 6 5
  `)

  assert.strictEqual(checksum(sampleA), 18)
  assert.strictEqual(checksum(sampleB, true), 9)
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(checksum(input), 46402)
  assert.strictEqual(checksum(input, true), 265)
})
