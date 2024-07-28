import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findRepeat, steps } from './'

test('Day 12 — Sample', () => {
  const sampleA = $.sample(`
  <x=-8, y=-10, z=0>
  <x=5, y=5, z=10>
  <x=2, y=-7, z=3>
  <x=9, y=-8, z=-3>
  `)

  const sampleB = $.sample(`
  <x=-1, y=0, z=2>
  <x=2, y=-10, z=-7>
  <x=4, y=-8, z=8>
  <x=3, y=5, z=-1>
  `)

  assert.strictEqual(steps(sampleA, 100), 1940)
  assert.strictEqual(findRepeat(sampleB), 2772)
  assert.strictEqual(findRepeat(sampleA), 4_686_774_924)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(steps(input, 1000), 6849)
  assert.strictEqual(findRepeat(input), 356_658_899_375_688)
})
