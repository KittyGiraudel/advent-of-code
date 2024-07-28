import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', () => {
  const sample = $.sample(`
  2199943210
  3987894921
  9856789892
  8767896789
  9899965678
  `)

  assert.strictEqual(run(sample), 15)
  assert.strictEqual(run(sample, true), 1134)
})

test('Day 09 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 500)
  assert.strictEqual(run(input, true), 970_200)
})
