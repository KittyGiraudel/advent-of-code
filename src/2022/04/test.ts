import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getInclusions, getOverlaps } from './'

test('Day 04 — Sample', () => {
  const sample = $.sample(`
  2-4,6-8
  2-3,4-5
  5-7,7-9
  2-8,3-7
  6-6,4-6
  2-6,4-8
  `)

  assert.strictEqual(getInclusions(sample), 2)
  assert.strictEqual(getOverlaps(sample), 4)
})

test('Day 04 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(getInclusions(input), 651)
  assert.strictEqual(getOverlaps(input), 956)
})
