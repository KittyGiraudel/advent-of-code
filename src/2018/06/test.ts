import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { mapOut } from './'

test('Day 06 — Sample', () => {
  const sample = $.sample(`
  1, 1
  1, 6
  8, 3
  3, 4
  5, 5
  8, 9
  `)

  assert.strictEqual(mapOut(sample).largestRegionSize, 17)
  assert.strictEqual(mapOut(sample, 32).safeRegionSize, 16)
})

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.deepStrictEqual(mapOut(input, 10_000), {
    largestRegionSize: 5941,
    safeRegionSize: 40_244,
  })
})
