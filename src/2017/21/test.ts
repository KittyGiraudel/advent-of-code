import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 21 — Sample', () => {
  const sample = $.sample(`
  ../.# => ##./#../...
  .#./..#/### => #..#/..../..../#..#
  `)

  assert.strictEqual(run(sample, 2), 12)
})

test('Day 21 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 5), 197)
  assert.strictEqual(run(input, 18), 3_081_737)
})
