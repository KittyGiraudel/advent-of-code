import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { countSandUnits } from './'

test('Day 14 — Sample', () => {
  const sample = $.sample(`
  498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9
  `)

  assert.strictEqual(countSandUnits(sample), 24)
  assert.strictEqual(countSandUnits(sample, true), 93)
})

test('Day 14 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(countSandUnits(input), 655)
  assert.strictEqual(countSandUnits(input, true), 26_484)
})
